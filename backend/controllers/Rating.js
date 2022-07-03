const CommentModel = require("../model/Comments");
const BorrowBookModel = require("../model/BorrowBooks");
const RatingModel = require("../model/Rating");
const BookModel = require("../model/Books");
const httpStatus = require("../utils/httpStatus");

const ratingController = {};
ratingController.getRatingForBook = async (req, res, next) => {
    try {
        let userId = req.userId;
        let idBook = req.params.bookId;
     
        let BookInfo = await RatingModel.findOne({book: idBook});
        return res.status(httpStatus.OK).json({
            data: BookInfo
        });

    } catch (e) {
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            message: e.message
        });
    }
}

// commentsController.list = async (req, res, next) => {
//     try {
//         console.log(req.params.borrowBookId);
//         let bookComment = await CommentModel.find({book: req.params.borrowBookId}).populate('user', [
//             '_id', 'fullName'
//         ]);
//         return res.status(httpStatus.OK).json({
//             data: postComments
//         });
//     } catch (error) {
//         return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({message: error.message});
//     }
// }


module.exports = ratingController;