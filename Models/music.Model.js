const { DataTypes } = require("sequelize");
const database = require("../Db");

const TABLE_NAME = 'track';

const track = database.define(TABLE_NAME, {
    title: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    cover: {
        type: DataTypes.STRING,
        allowNull: true
    },
    artist: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    year: {
        type: DataTypes.DATE,
        allowNull: true
    },
    producer: {
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
        await track.sync();
        console.log(`${track} model was created successfull`)
    } catch(error) {
        console.error(`${track} model was not created `, error)
    }
}

modelCreation();

module.exports = track;