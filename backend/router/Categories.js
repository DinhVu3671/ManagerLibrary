const categoriesController = require("../controllers/Categories");
const {asyncWrapper} = require("../utils/asyncWrapper");
const express = require("express");
const categoriesRoutes = express.Router();
const auth = require("../middleware/auth");

categoriesRoutes.post(
    "/create",
    asyncWrapper(categoriesController.create)
);
categoriesRoutes.get(
    "/show",
    auth,
    asyncWrapper(categoriesController.show),
);

// categoriesRoutes.post(
//     "/search", 
//     auth, 
//     categoriesController.searchCategory
// );

module.exports = categoriesRoutes;