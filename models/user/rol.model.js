const mongoose = require('mongoose')
const Schema = mongoose.Schema

const rolSchema = new Schema({
    name: {
        type: String,
        enum: ['Admin', 'Marketing', 'Budget', 'Objetives', 'Accounting', 'Reader']
    },
    description: {
        type: String
    }
}, {timestamps})

const Rol = mongoose.model('Rol', rolSchema)
module.exports = Rol