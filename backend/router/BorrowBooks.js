const borrowBookController = require("../controllers/BorrowBooks");
const {asyncWrapper} = require("../utils/asyncWrapper");
const express = require("express");
const borrowBookRoutes = express.Router();
const auth = require("../middleware/auth");

//tạo
borrowBookRoutes.post(
    "/create",
    auth,
    asyncWrapper(borrowBookController.create)
);
// gia hạn sách
borrowBookRoutes.get(
    "/edit",
    auth,
    asyncWrapper(borrowBookController.edit)
);
// trả sách
borrowBookRoutes.post(
    "/refurn",
    auth,
    asyncWrapper(borrowBookController.refurn),
);
// xoá
// booksRoutes.get(
//     "/delete/:id",
//     auth,
//     asyncWrapper(booksController.delete),
// );



// lấy ra list
// borrowBookRoutes.get(
//     "/list",
//     auth,
//     asyncWrapper(borrowBookController.list),
// );
// borrowBookRoutes.post(
//     "/search",
//     auth,
//     borrowBookController.search);


module.exports = borrowBookRoutes;