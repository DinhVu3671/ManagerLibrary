const express = require("express");
const usersRoutes = require("../Users");
const booksRoutes = require("../Books");
const categoriesRoutes = require("../Categories");
const borrowBookRoutes = require("../BorrowBooks");
const commentRoutes = require("../Comment");
// const postsRoutes = require("../Posts");
// const chatsRoutes = require("../Chats");

const apiRoutes = express.Router();

apiRoutes.use("/users", usersRoutes);
apiRoutes.use("/books", booksRoutes);
apiRoutes.use("/categories", categoriesRoutes);
apiRoutes.use("/borrowbooks", borrowBookRoutes);
apiRoutes.use("/comment", commentRoutes);
// apiRoutes.use("/posts", postsRoutes);
// apiRoutes.use("/chats", chatsRoutes)


apiRoutes.get(
    "/", (req, res) => res.json({ api: "is-working" })
);
module.exports = apiRoutes;