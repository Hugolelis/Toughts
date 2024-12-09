import express from 'express'
import exphbs from 'express-handlebars'
import flash from 'express-flash';
import path from 'path';
import os from 'os'
import session from 'express-session'
import FileStore from 'session-file-store';

const FileStoreInstance = FileStore(session);
const app = express()
const port = 3000

import { sequelize as conn } from './db/conn.js';

app.engine('handlebars', exphbs.engine())
app.set('view engine', 'handlebars')

app.use(express.urlencoded({extended: true}))
app.use(express.json())

import { router as toughtsRoutes } from './routes/toughtsRoutes.js';
import { router as authRoutes } from './routes/authRoutes.js';

import { Tought } from './models/Tought.js';
import { User } from './models/User.js';

app.use(session({
    name: 'session',
    secret: 'nosso_secret',
    resave: false,
    saveUninitialized: false,
    store: new FileStoreInstance({
        logFn: () => {},
        path: path.join(os.tmpdir(), 'sessions')
    }),
    cookie: {
        secure: false,
        maxAge: 360000,
        expires: new Date(Date.now() + 360000),
        httpOnly: true
    }
}))

app.use(flash())

app.use((req, res, next) => {
    if(req.session.userid) {
        res.locals.session = req.session
    }

    next()
})

app.use(express.static('public'))

app.use('/toughts', toughtsRoutes)
app.use('/', authRoutes)

app.get('/', (req, res) => {
    res.redirect('/toughts')
})

conn.sync().then(() => {
    app.listen(port)
    console.log(`Servidor rodando na porta ${port}`)
}).catch(e => console.log(e))