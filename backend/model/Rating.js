const { Timestamp, Double, Decimal128 } = require("mongodb");
const mongoose = require("mongoose");

const ratingSchema = new mongoose.Schema({
    book: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Books"
    },
    numberStar: {
        type: Number ,
        required: false
    },
    numberRate: {
        type: Number ,
        required: false
    },

});
ratingSchema.set('timestamps', true);
module.exports = mongoose.model('Rating', ratingSchema);