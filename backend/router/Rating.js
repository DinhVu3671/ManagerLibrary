const ratingController = require("../controllers/Rating");
const {asyncWrapper} = require("../utils/asyncWrapper");
const express = require("express");
const ratingRoutes = express.Router();
const auth = require("../middleware/auth");

//tạo
// commentsRoutes.post(
//     "/create/:borrowBookId",
//     auth,
//     asyncWrapper(commentController.create)
// );

// lấy ra theo sách
ratingRoutes.get(
    "/bookInfo/:bookId",
    asyncWrapper(ratingController.getRatingForBook),
);


module.exports = ratingRoutes;