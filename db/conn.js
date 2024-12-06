import { Sequelize } from "sequelize";

export const sequelize = new Sequelize('toughts', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
})

try {
    sequelize.authenticate()
    console.log('Conectamos ao banco')
} catch (e) {
    console.log(e)
}