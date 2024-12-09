import { raw } from "mysql2";
import { Tought } from "../models/Tought.js";
import { User } from "../models/User.js";

export class ToughtController {
    static async showToughts(req, res) {
        res.render('toughts/home')
    }

    static async dashboard(req, res) {
        const userid = req.session.userid

        const user = await User.findOne({where: {id: userid}, include: Tought, plain: true})

        if(!user) {
            res.redirect('/login')
            return
        }

        const toughts = user.Toughts.map((result) => result.dataValues)
        let emptyToughts = false

        if(toughts.length === 0) {
            emptyToughts = true
        }

        res.render('toughts/dashboard', { toughts, emptyToughts })
    }

    static async deleteTought(req, res) {
        const { id } = req.body
        const userid = req.session.userid

        await Tought.destroy({where: {id: id, UserId: userid}})
        req.flash('message', 'Pensamento excluido com sucesso!')

        try {
            req.session.save(() => {
                res.redirect('/toughts/dashboard')
            })
        } catch(e) {
            console.log(e)
        }
    }

    static createTought(req, res) {
        res.render('toughts/create')
    }

    static async createToughtSave(req, res) {
        const tought = {
            title: req.body.title,
            UserId: req.session.userid
        }

        await Tought.create(tought)

        req.flash('message', 'Pensamento criado com sucesso!')

        try {
            req.session.save(() => {
                res.redirect('/toughts/dashboard')
            })
        } catch(e) {
            console.log(e)
        }
    }
}