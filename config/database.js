const { Sequelize } = require('sequelize');


// Option 3: Passing parameters separately (other dialects)
const db = new Sequelize('codegig', 'root', '', {
    host: 'localhost',
    dialect: 'mysql' /* one of 'mysql' | 'mariadb' | 'postgres' | 'mssql' */
})

// Test DB


module.exports = db