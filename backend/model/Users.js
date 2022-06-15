const mongoose = require("mongoose");

const usersSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    gmail: {
        type: String,
        required: false
    },
    password: {
        type: String,
        required: true,
        max: 255,
        min: 6
    },
});
usersSchema.set('timestamps', true);
usersSchema.index({phone: 'text'});
module.exports = mongoose.model('Users', usersSchema);
