const Sequelize = require('sequelize')

const db = require('../config/database')


const Gig = db.define('gig', {
    id:{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    title: {
        type: Sequelize.STRING
    },
    technologies: {
        type: Sequelize.STRING
    },
    description: {
        type: Sequelize.STRING
    },
    budget: {
        type: Sequelize.STRING
    },
    contact_email: {
        type: Sequelize.STRING
    },
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE
})

module.exports = Gig