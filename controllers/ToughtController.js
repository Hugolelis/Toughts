import { Tought } from "../models/Tought.js";
import { User } from "../models/User.js";

export class ToughtController {
    static async showToughts(req, res) {
        res.render('toughts/home')
    }
}