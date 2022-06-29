const { Timestamp } = require("mongodb");
const mongoose = require("mongoose");

const borrowBookSchema = new mongoose.Schema({
    book: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Books"
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users"
    },
    status: {
        type: String,
        required: true
    },
    borrowDate: {
        type: Date,
        required: true
    },
    refundDate: {
        type: Date,
        required: false
    },
    refundAppointmentDate: {
        type: Date,
        required: true
    }
});
// booksSchema.set('timestamps', true);
module.exports = mongoose.model('borrowBooks', borrowBookSchema);
