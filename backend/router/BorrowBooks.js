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
// search đang mượn, đã trả theo id
borrowBookRoutes.get(
    "/search/:idUser",
    auth,
    asyncWrapper(borrowBookController.searchByIdUser),
);
// search đang mượn, đã trả của admin
borrowBookRoutes.post(
    "/search",
    auth,
    asyncWrapper(borrowBookController.searchAdmin),
);


// lấy ra list theo user
borrowBookRoutes.get(
    "/list/:idUser",
    auth,
    asyncWrapper(borrowBookController.list),
);
// chờ mượn sách
borrowBookRoutes.post(
    "/awaitBorrowBook",
    auth,
    borrowBookController.awaitBorrowBook);
// // duyet sách chờ
// borrowBookRoutes.post(
//     "/acceptBorrowBook",
//     auth,
//     borrowBookController.accreptBorrowBook);

module.exports = borrowBookRoutes;