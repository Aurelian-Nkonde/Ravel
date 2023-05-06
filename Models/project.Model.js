const { DataTypes } = require("sequelize");
const database = require("../Db");

const TABLE_NAME = 'project';

const project = database.define(TABLE_NAME, {
    title: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    launch: {
        type: DataTypes.STRING,
        allowNull: true
    },
    collaborators: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    genre: {
        type: DataTypes.STRING,
        allowNull: true
    }
})

async function modelCreation(){
    try {
        await project.sync();
        console.log(`${project} model was created successfull`)
    } catch(error) {
        console.error(`${project} model was not created `, error)
    }
}

modelCreation();

module.exports = project;