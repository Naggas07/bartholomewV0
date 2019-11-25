const mongoose = require('mongoose')
const Schema = mongoose.Schema

const deparmentSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    state: {
        type: String
    },
    squads: {
        type: Array
    }
}, {timestamps})

const Department = mongoose.model('Department', deparmentSchema)
module.exports = Department