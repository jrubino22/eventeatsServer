const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Order = new Schema(
    {
        dish: { 
            type: String, 
            required: true 
        },
        option1: { 
            type: String, 
            required: true 
        },
        option2: { 
            type: String, 
            required: false
        },
    },
    { timestamps: true },
)

module.exports = mongoose.model('order', Order)