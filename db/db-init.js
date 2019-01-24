const Sequelize = require("sequelize");
const config = require("../config/config.json")["db-config"];

const sequelize = new Sequelize(config.dbName, config.login, config.password, {
    host: config.hostAws,
    port: config.port,
    dialect: "mysql",
    operatorsAliases: false, 
    encrypt: true,

    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
});

const ping = () => {
    sequelize.authenticate()
        .then(() => {
            console.log('Connection has been established successfully');
        })
        .catch(err => {
            console.error('Unable to connect to the database', err);
        });
};

module.exports = { sequelize, ping };

