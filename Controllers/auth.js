const userModel = require("../Models/user.Model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
const { string } = require("zod");


dotenv.config();

exports.register = async function (req, res, next) {
    const { username, password, email } = req.body;

    const userExist = await userModel.findOne({
        where: {
            email: email
        }
    });
    if (userExist) {
        console.error('User exists');
        res.status(400).send("User already exists")
    }

    const encryptPassword = await bcrypt.hash(password, 10);
    let newUser = {
        username: username,
        password: encryptPassword,
        email: email,
        role: "user"
    }
    try {
        const user = await userModel.create(newUser);
        const token = await jwt.sign(
            { email },
            'secreto',
            { expiresIn: "1hr" }
        )
        res.status(200).json(
            {
                message: "User is created",
                user,
                token
            }
        )
    } catch (error) {
        console.error('Error creating a user');
        res.status(401).send("Error creating a user")
    }

}


exports.login = async function (req, res, next) {
    const { email, password } = req.body;

    try {
        const user = await userModel.findOne({
            where: { email: email }
        });
        if (user && (await bcrypt.compare(password, user.password))) {
            const token = await jwt.sign(
                { email },
                'secreto',
                { expiresIn: "1hr" }
            )
            res.status(200).send({
                message: "Successfull logging in",
                user: user,
                token
            })
        } else {
            console.error('Password not match');
            res.status(400).send('Password not match')
        }
    } catch (error) {
        console.error('User not found');
        next(error);
    }

}