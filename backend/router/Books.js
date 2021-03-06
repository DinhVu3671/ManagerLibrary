const booksController = require("../controllers/Books");
const {asyncWrapper} = require("../utils/asyncWrapper");
const express = require("express");
const booksRoutes = express.Router();
const auth = require("../middleware/auth");

//tạo
booksRoutes.post(
    "/create",
    auth,
    asyncWrapper(booksController.create)
);
// sửa
booksRoutes.post(
    "/edit/:id",
    auth,
    asyncWrapper(booksController.edit)
);
// lấy ra 1
booksRoutes.get(
    "/show/:id",
    asyncWrapper(booksController.show),
);
// xoá
booksRoutes.get(
    "/delete/:id",
    auth,
    asyncWrapper(booksController.delete),
);
// lấy ra list
booksRoutes.get(
    "/list",
    asyncWrapper(booksController.list),
);
booksRoutes.post(
    "/search",
    auth,
    booksController.search);

booksRoutes.get(
    "/outstandingBook",
    booksController.outstandingBook);


module.exports = booksRoutes;