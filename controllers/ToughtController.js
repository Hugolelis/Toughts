import { Tought } from "../models/Tought.js";
import { User } from "../models/User.js";

import { Op} from "sequelize"

export class ToughtController {
    static async showToughts(req, res) {
        let search = ''

        if(req.query.search) {
            search = req.query.search
        }

        let order = 'n'
        if(req.query.order === 'old') {
            order = 'ASC'
        } else {
            order = 'DESC'
        }

        const toughtsData = await Tought.findAll(
            {
                include: User, 
                where: {title: {[Op.like]: `%${search}%`}},
                order: [['createdAt', order]]
            }
        )

        const toughts = toughtsData.map((result) => result.get({plain: true}))

        let toughtsQty = toughts.length

        if(toughtsQty === 0) {
            toughtsQty = false
        }

        res.render('toughts/home', {toughts, search, toughtsQty})
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

    static async updateTought(req, res) {
        const id = req.params.id
        const tought = await Tought.findOne({raw: true, where: {id: id}})

        res.render('toughts/edit', {tought})
    }

    static async updateToughtSave(req, res) {
        const { title, id } = req.body

        const tought = {
            title,
        }

        await Tought.update(tought, {where: {id: id}})

        req.flash('message', 'Pensamento editado com sucesso!')

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