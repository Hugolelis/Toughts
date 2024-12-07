import express from 'express'
export const router = express.Router()
import { ToughtController} from '../controllers/ToughtController.js'


router.get('/', ToughtController.showToughts)