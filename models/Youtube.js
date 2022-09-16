const mongoose = require('mongoose')

const Youtube = mongoose.model('Youtube', {
    tittle:String,
    time:Number,
    user:String
})

module.exports = Youtube
