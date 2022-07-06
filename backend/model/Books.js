const { Decimal128 } = require("mongodb");
const mongoose = require("mongoose");

const booksSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    images: {
            type: String,
            required: false
    },
    total: {
        type: String,
        required: true,
        default: 0
    },
    availableNumber: {
        type: String,
        required: true
    },
    categories: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Categories"
        }
    ],
    author: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    publishYear: {
        type: String,
        required: false
    },
    numberStar: {
        type: Decimal128 ,
        required: false
    },
    numberRate: {
        type: Number ,
        required: false
    },

});
booksSchema.set('timestamps', true);
module.exports = mongoose.model('Books', booksSchema);
