const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userStateSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String
    }
}, {timestamps})

const UserState = mongoose.model('UserState', userStateSchema)
module.exports = UserState