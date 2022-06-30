const { Timestamp } = require("mongodb");
const mongoose = require("mongoose");

const ratingSchema = new mongoose.Schema({
    book: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Books"
    },
    numberStar: {
        type: String,
        required: false
    },
    numberRate: {
        type: String,
        required: false
    },

});
ratingSchema.set('timestamps', true);
module.exports = mongoose.model('Rating', ratingSchema);