const BorrowBookModel = require("../model/BorrowBooks");
const httpStatus = require("../utils/httpStatus");
// var ObjectId = require('mongodb').ObjectID

const borrowBookController = {};

borrowBookController.create = async (req, res, next) => {
    try {
        const {
            idBooks,
            idUser
        } = req.body;
        let responsive = [];
        if(idBooks.length > 0) {
            idBooks.map(async (item) => {
                let checkDuplicate = await BorrowBookModel.find({book: item}).exec();
                if (checkDuplicate.length > 0) {
                    console.log(checkDuplicate);
                    return res.status(httpStatus.NOT_ACCEPTABLE).json({message: "Tồn tại quyển sách đã mượn", id: item});
                }
                const borrowBook = new BorrowBookModel({
                    book: item,
                    user: idUser,
                    status: "borrowing",
                    borrowDate: new Date(),
                    refundDate: null,
                    refundAppointmentDate: new Date(new Date().getTime() + 3600000*24*30)
                });
                let borrowBookSaved = (await borrowBook.save());
            })
            const brrowBooks = await BorrowBookModel.find({book: {$in: idBooks}}).populate({
                path: 'book',
                select: '_id title categories author',
                model: 'Books',
            }).populate({
                path: 'idUser',
                select: '_id fullName phone gmail',
                model: 'Users',
            });
            // responsive = brrowBooks
        }
// { field: { $in: [<value1>, <value2>, ... <valueN> ] } }
        return res.status(httpStatus.OK).json({
            data: brrowBooks
        });
    } catch (e) {
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            message: e.message
        });
    }
}
borrowBookController.edit = async (req, res, next) => {
    try {
       let idBooks = [
        "62aedc052d6f3f3bf410f095",
        "62aedc1c2d6f3f3bf410f09a"
        ];
        let borrowBookSaved = await BorrowBookModel.find({book: {$in: idBooks}}).populate({
            path: 'book',
            select: '_id title categories author',
            model: 'Books',
        }).populate({
            path: 'idUser',
            select: '_id fullName phone gmail',
            model: 'Users',
        });
        return res.status(httpStatus.OK).json({
            data: borrowBookSaved
        });
    } catch (e) {
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            message: e.message
        });
    }
}
borrowBookController.refurn = async (req, res, next) => {
    try {
        const {
            idBooks,
            idUser
        } = req.body;
        let responsive = [];
        if(idBooks.length > 0) {
            idBooks.map(async (item) => {
                let bookBorrow = await BorrowBookModel.findById(item);
                if (bookBorrow.length === 0) {
                    console.log(checkDuplicate);
                    return res.status(httpStatus.NOT_ACCEPTABLE).json({message: "Không tồn tại quyển sách này đã mượn", id: item});
                }
                let borrowBookRefurn = await BookModel.findByIdAndUpdate(item, {
                    book: bookBorrow.book,
                    user: bookBorrow.idUser,
                    status: "refurn",
                    borrowDate: bookBorrow.borrowDate,
                    refundDate: new Date(),
                    refundAppointmentDate: bookBorrow.refundAppointmentDate
                });
            })
            const brrowBooksRes = await BorrowBookModel.find({_id: {$in: idBooks}}).populate({
                path: 'book',
                select: '_id title categories author',
                model: 'Books',
            }).populate({
                path: 'idUser',
                select: '_id fullName phone gmail',
                model: 'Users',
            });

        }
// { field: { $in: [<value1>, <value2>, ... <valueN> ] } }
        return res.status(httpStatus.OK).json({
            data: brrowBooksRes
        });
    } catch (e) {
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            message: e.message
        });
    }
}
module.exports = borrowBookController;