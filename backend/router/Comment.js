const commentController = require("../controllers/Comments");
const {asyncWrapper} = require("../utils/asyncWrapper");
const express = require("express");
const commentsRoutes = express.Router();
const auth = require("../middleware/auth");

//tạo
commentsRoutes.post(
    "/create/:borrowBookId",
    auth,
    asyncWrapper(commentController.create)
);
// sửa
// commentsRoutes.post(
//     "/edit/:id",
//     auth,
//     asyncWrapper(commentController.edit)
// );
// lấy ra 1
// commentsRoutes.get(
//     "/show/:id",
//     auth,
//     asyncWrapper(commentController.show),
// );
// xoá
// commentsRoutes.get(
//     "/delete/:id",
//     auth,
//     asyncWrapper(booksController.delete),
// );
// lấy ra list theo sách
commentsRoutes.get(
    "/list/:borrowBookId",
    auth,
    asyncWrapper(commentController.list),
);


module.exports = commentsRoutes;