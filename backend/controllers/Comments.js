const CommentModel = require("../model/Comments");
const BorrowBookModel = require("../model/BorrowBooks");
const BookModel = require("../model/Books");
const httpStatus = require("../utils/httpStatus");

const commentsController = {};
commentsController.create = async (req, res, next) => {
    try {
        let userId = req.userId;
        let borrowBook;
        try {
            borrowBook = await BorrowBookModel.find({book: req.params.borrowBookId});
            if (borrowBook == null) {
                return res.status(httpStatus.NOT_FOUND).json({message: "Can not rating this Book"});
            }
        } catch (error) {
            return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({message: error.message});
        }const {
            content,
            numberStart
        } = req.body;

        const borrowBookComment = new CommentModel({
            user: userId,
            book: req.params.borrowBookId,
            description: content,
            numberStart: numberStart
        });
        let borrowBookCommentSaved = await borrowBookComment.save();
        //câp nhat start book
        //
        //

        borrowBookCommentSaved = await CommentModel.findById(borrowBookCommentSaved._id).populate('images', ['fileName'])
        .populate({
            path: 'user',
            select: '_id fullName',
            model: 'Users',
        }).populate({
            path: 'borrowBook',
            select: '_id',
            model: 'BorrowBooks',
        });
        return res.status(httpStatus.OK).json({
            data: borrowBookCommentSaved
        });
    } catch (e) {
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            message: e.message
        });
    }
}

commentsController.list = async (req, res, next) => {
    try {
        console.log(req.params.borrowBookId);
        let bookComment = await CommentModel.find({book: req.params.borrowBookId}).populate('user', [
            '_id', 'fullName'
        ]);
        return res.status(httpStatus.OK).json({
            data: postComments
        });
    } catch (error) {
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({message: error.message});
    }
}


module.exports = commentsController;