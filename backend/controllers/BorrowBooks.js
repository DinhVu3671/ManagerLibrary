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
                let checkDuplicate = await BorrowBookModel.find({book: item, user: idUser}).exec();
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
            responsive = await BorrowBookModel.find({book: {$in: idBooks}}).populate({
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

        return res.status(httpStatus.OK).json({
            data: responsive
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
                let bookBorrow = await BorrowBookModel.findOne({book: item, user: idUser, status: 'borrowing'});
                if (bookBorrow.length === 0) {
                    return res.status(httpStatus.NOT_ACCEPTABLE).json({message: "Không tồn tại quyển sách này đã mượn", idBook: item});
                }
                console.log(bookBorrow)
                let borrowBookRefurn = await BorrowBookModel.findByIdAndUpdate(bookBorrow._id, {
                    book: bookBorrow.book,
                    user: bookBorrow.user,
                    status: "refurn",
                    borrowDate: bookBorrow.borrowDate,
                    refundDate: new Date(),
                    refundAppointmentDate: bookBorrow.refundAppointmentDate
                });
            })
            responsive = await BorrowBookModel.find({book: {$in: idBooks}}).populate({
                path: 'book',
                select: '_id title categories author',
                model: 'Books',
            }).populate({
                path: 'idUser',
                select: '_id fullName phone',
                model: 'Users',
            });

        }
        return res.status(httpStatus.OK).json({
            data: responsive
        });
    } catch (e) {
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            message: e.message
        });
    }
}

borrowBookController.searchByIdUser = async (req, res, next) => {
    try {
        const {
            typeBorrowBook,
        } = req.body;
        let userId = req.params.idUser
        let bookBorrow = await BorrowBookModel.find({user: userId, status: typeBorrowBook}).populate({
                        path: 'book',
                        select: '_id title categories author',
                        model: 'Books',
                    }).populate({
                        path: 'idUser',
                        select: '_id fullName phone gmail',
                        model: 'Users',
                    });
        if (bookBorrow.length === 0) {
            return res.status(httpStatus.NOT_ACCEPTABLE).json({message: "Không tồn tại quyển sách nào"});
        }
              
        return res.status(httpStatus.OK).json({
            data: bookBorrow
        });
    } catch (e) {
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            message: e.message
        });
    }
}

borrowBookController.list = async (req, res, next) => {
    try {
        let userId = req.params.idUser;
        console.log(userId)
        let bookBorrow = await BorrowBookModel.find({user: userId}).populate({
                        path: 'book',
                        // select: '_id title categories author',
                        model: 'Books',
                        populate: {
                            path: 'categories',
                            select: '_id name',
                            model: 'Categories',
                        }
                    }).populate({
                        path: 'user',
                        select: '_id fullName phone gmail',
                        model: 'Users',
                    });
        if (bookBorrow.length === 0) {
            return res.status(httpStatus.NOT_ACCEPTABLE).json({message: "Không tồn tại quyển sách nào"});
        }
              
        return res.status(httpStatus.OK).json({
            data: bookBorrow
        });
    } catch (e) {
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            message: e.message
        });
    }
}

borrowBookController.searchAdmin = async (req, res, next) => {
    try {
        const {
            typeBorrowBook,
        } = req.body;
        let bookBorrow = await BorrowBookModel.aggregate([
            { "$match": {status: typeBorrowBook } },
            {
              $group: {
                "_id": "$user",
                "status": { "$first": "$status" },
                "book": { "$addToSet": "$book"}
              }
            },
        { "$lookup": {
                "from": "users",
                "localField": "_id",
                "foreignField": "_id",
                "as": "user",
                
           }},
            { "$lookup": {
                "from": "books",
                "localField": "book",
                "foreignField": "_id",
                "as": "book"
           }},
    //        {"$lookup": {
    //         "from": "categories",
    //         "localField": "categories",
    //         "foreignField": "_id",
    //         "as": "categories"
    //    }},
           { "$unwind": { "path" : "$user" } },
        //    { "$unwind": { "path" : "$book" } }
          ]);
        // .populate({
        //                 path: 'categories',
        //                 select: '_id name',
        //                 model: 'Categories',
        //             })
        if (bookBorrow.length === 0) {
            return res.status(httpStatus.NOT_ACCEPTABLE).json({message: "Không tồn tại quyển sách nào"});
        }
              
        return res.status(httpStatus.OK).json({
            data: bookBorrow
        });
    } catch (e) {
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            message: e.message
        });
    }
}

borrowBookController.awaitBorrowBook = async (req, res, next) => {
    try {
        const {
            idBooks
        } = req.body;
        let idUser = req.userId;
        let result = [];
        if(idBooks.length > 0) {
            let responsive = [];
            idBooks.map(async (item) => {
                let checkDuplicate = await BorrowBookModel.find({book: item, user: idUser, status: "borrowing"}).exec();
                if (checkDuplicate.length > 0) {
                    console.log(checkDuplicate);
                    return res.status(httpStatus.NOT_ACCEPTABLE).json({message: "Tồn tại quyển sách đã mượn", id: item});
                }
                const borrowBook = new BorrowBookModel({
                    book: item,
                    user: idUser,
                    status: "await",
                    borrowDate: new Date(),
                    refundDate: null,
                    refundAppointmentDate: new Date(new Date().getTime() + 3600000*24*30)
                });
                let borrowBookSaved = await borrowBook.save();
                responsive.push(borrowBookSaved._id);
            })
            result = await BorrowBookModel.findById({$in: responsive}).populate({
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

        return res.status(httpStatus.OK).json({
            data: result
        });
    } catch (e) {
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            message: e.message
        });
    }
} 

borrowBookController.accreptBorrowBook = async ( req, res, next) => {
    try {
        const {
            idBooks,
            idUser
        } = req.body;
        let responsive = [];
        if(idBooks.length > 0) {
            idBooks.map(async (item) => {
                let bookBorrow = await BorrowBookModel.findOneAndUpdate({book: item, user: idUser},
                    {
                        status: "borrowing",
                        borrowDate: new Date(),
                        refundAppointmentDate: new Date(new Date().getTime() + 3600000*24*30)
                    }, {
                    new: true,
                    runValidators: true
                });
        
                if (!bookBorrow) {
                    return res.status(httpStatus.NOT_FOUND).json({message: "Can not find book", id: item});
                }
            })
            responsive = await BorrowBookModel.find({book: {$in: idBooks}}).populate({
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

        return res.status(httpStatus.OK).json({
            data: responsive
        });
    } catch (e) {
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            message: e.message
        });
    }
}
module.exports = borrowBookController;