import { DataTypes } from "sequelize";
import { sequelize as db } from "../db/conn.js";

export const User = db.define('User', {
    name: {
        type: DataTypes.STRING,
        required: true
    },

    email: {
        type: DataTypes.STRING,
        required: true
    },

    password: {
        type: DataTypes.STRING,
        required: true
    },
})