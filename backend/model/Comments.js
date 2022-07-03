const { Timestamp } = require("mongodb");
const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
    book: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Books"
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users"
    },
    numberStar: {
        type: Number,
        required: false
    },
    description: {
        type: String,
        required: false
    },

});
commentSchema.set('timestamps', true);
module.exports = mongoose.model('comments', commentSchema);