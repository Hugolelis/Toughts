import { DataTypes } from "sequelize";
import { sequelize as db } from '../db/conn.js'

import { User } from "./User.js";

export const Tought = db.define('Tought', {
    title: {
        type: DataTypes.STRING,
        allowNull: false,
        required: true
    }
})

Tought.belongsTo(User)
User.hasMany(Tought)