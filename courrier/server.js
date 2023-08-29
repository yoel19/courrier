const PORT = 3333

const jsonServer = require('json-server')
const auth = require('json-server-auth')

const app = jsonServer.create()
const router = jsonServer.router('db.json')

// /!\ Bind the router db to the app
app.db = router.db

// You must apply the auth middleware before the router
const cors = require('cors');


const corsOptions = {
    origin: "*"
    //   origin: process.env.CLIENT_URL,
    //   credentials: true,
    //   'allowedHeaders': ['sessionId', 'Content-Type'],
    //   'exposedHeaders': ['sessionId'],
    //   'methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',
    //   'preflightContinue': false
}
app.use(cors(corsOptions));
app.use(auth)
app.use(router)


app.listen(PORT, () => {
    console.log(`Server listening at: http://localhost:${PORT}`)
})