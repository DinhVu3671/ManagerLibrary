const mongoose = require("mongoose");

const categoriesSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
});
categoriesSchema.set('timestamps', true);
module.exports = mongoose.model('Categories', categoriesSchema);
