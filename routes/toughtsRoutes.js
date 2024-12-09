import express from 'express'
export const router = express.Router()
import { ToughtController} from '../controllers/ToughtController.js'

import { checkAuth } from '../helpers/auth.js'

router.get('/add', checkAuth, ToughtController.createTought)
router.post('/add', checkAuth, ToughtController.createToughtSave)
router.get('/dashboard', checkAuth, ToughtController.dashboard)
router.post('/deleteTought', checkAuth, ToughtController.deleteTought)
router.get('/', ToughtController.showToughts)
