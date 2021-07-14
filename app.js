const express = require("express")
const app = express()
const mongoose = require("mongoose")
const ThingsModel = require('./models/things')

mongoose.connect("mongodb://127.0.0.1:27017", { useNewUrlParser: true, useUnifiedTopology: true})
const db = mongoose.connection
db.once("open", () => console.log("DB Connected"))

const router = express.Router()
app.use(express.json());
router.get('/', (req,res) => {
    res.status(200).end()
})

router.get('/things', async (req, res) => {
    return res.json({things: await ThingsModel.find({})})
})

router.post('/things', async (req, res) => {
    const thing = req.body.thing;
    const doc = await ThingsModel({thing})
    .save()
    return res.status(200).json(doc)
})

app.use(router)
const server = app.listen(3000);
module.exports = {app, server};
