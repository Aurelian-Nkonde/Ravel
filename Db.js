const Sequalize = require("sequelize");


const sequalize = new Sequalize(
    'ravel',
    'root',
    'Thousand@90',
    {
        host: 'localhost',
        dialect: 'mysql'
    }
)

async function DatabaseConnection(){
    try{
        await sequalize.Authenticate();
        console.log('Database connected successfull');
    } catch(error) {
        console.error('Database connection failed');
    }
}

DatabaseConnection();

module.exports = sequalize;