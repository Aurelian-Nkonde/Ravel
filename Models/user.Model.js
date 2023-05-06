const { DataTypes } = require("sequelize")
const database = require("../Db");


const TABLE_NAME = 'user'
const user = database.define(TABLE_NAME, {
    username: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    // token: {
    //     type: DataTypes.STRING,
    //     allowNull: true,
    // },
    role: {
        type: DataTypes.STRING,
        allowNull: true
    }
})


async function modelCreation(){
    try {
        await user.sync();
        console.log(`${user} model was created`);
    } catch(error) {
        console.error(`${user} was not created, error: `, error);
    }    
}

modelCreation();

module.exports = user;
