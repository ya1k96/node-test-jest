const Schema = require("mongoose").Schema
const model = require("mongoose").model

const ThingSchema = Schema({
    description: String
})

module.exports = model("Things", ThingSchema)