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
    images: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Documents"
        }
    ],
    total: {
        type: String,
        required: true,
        default: 0
    },
    availableNumber: {
        type: String,
        required: true
    },
    categoryId: [
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
});
booksSchema.set('timestamps', true);
module.exports = mongoose.model('Books', booksSchema);
