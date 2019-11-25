const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    username: String,
    password: String,
    fName: String,
    lName: String,
    displayPicture: String
})

module.exports = mongoose.model('User', userSchema);