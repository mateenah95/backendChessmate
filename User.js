const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    username: String,
    password: String,
    displayPicture: String,
    score: Number,
    rank: Number,
    singleplayer: {
        wins: Number,
        loss: Number,
        draws: Number
    },
    multiplayer: {
        wins: Number,
        loss: Number,
        draws: Number
    },
})

module.exports = mongoose.model('User', userSchema);