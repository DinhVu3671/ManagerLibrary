const BookModel = require("../model/Books");
const CategoriesModel = require("../model/Categories")
const RatingModel = require("../model/Rating");
const httpStatus = require("../utils/httpStatus");

const booksController = {};
booksController.create = async (req, res, next) => {
    try {
        const {
            title,
            images,
            total,
            categories,
            author,
            description,
            publishYear,
        } = req.body;
        const book = new BookModel({
            title: title,
            status: total > 0 ? "Available" : "UnAvailable",
            total: total,
            availableNumber: total,
            categories: categories,
            author: author,
            description: description,
            publishYear: publishYear,
            images: images,
            numberStar: 0,
            numberRate: 0
        });

        let bookSaved = (await book.save());
        let category = await CategoriesModel.findById(categories);
        let categoryUpdate = await CategoriesModel.findByIdAndUpdate(categories, {
            total: String(Number(category.total) + 1)

        })
        
        // const rating = new RatingModel({
        //     book: bookSaved._id,
        //     numberStar: 0,
        //     numberRate: 0
        // })
        // let ratingSaved = await rating.save().populate({
        //     path: 'book',
        //     select: '_id title categories author',
        //     model: 'Books',
        // })
        bookSaved = await BookModel.findById(bookSaved._id)
        .populate({
            path: 'categories',
            select: '_id name',
            model: 'Categories',
        });
        return res.status(httpStatus.OK).json({
            data: bookSaved
        });
    } catch (e) {
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            message: e.message
        });
    }
}
booksController.edit = async (req, res, next) => {
    try {
        // let userId = req.userId;
        let bookId = req.params.id;
        let bookFind = await BookModel.findById(bookId);
        if (bookFind == null) {
            return res.status(httpStatus.NOT_FOUND).json({message: "Can not find book"});
        }

        const {
            title,
            images,
            total,
            availableNumber,
            categories,
            author,
            description,
            publishYear
        } = req.body;
        // let dataImages = [];
        // if (Array.isArray(images)) {
        //     for (const image of images) {
        //         dataImages.push(image);
        //     }
        // }
        let categoriUpdate = [];
        categoriUpdate.push(categories)
        let bookSaved = await BookModel.findByIdAndUpdate(bookId, {
            title: title,
            status: total > 0  ? (availableNumber == 0 ? "UnAvailable" : "Available") : "UnAvailable",
            images: images,
            total: total,
            availableNumber: availableNumber,
            categories: categoriUpdate,
            author: author,
            description: description,
            publishYear: publishYear
        });
        bookSaved = await BookModel.findById(bookSaved._id).populate({
            path: 'categories',
            select: '_id name',
            model: 'Categories',
        });
        return res.status(httpStatus.OK).json({
            data: bookSaved
        });
    } catch (e) {
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            message: e.message
        });
    }
}
booksController.show = async (req, res, next) => {
    try {
        let book = await BookModel.findById(req.params.id).populate({
            path: 'categories',
            select: '_id name',
            model: 'Categories',
        });
        if (book == null) {
            return res.status(httpStatus.NOT_FOUND).json({message: "Can not find book"});
        }
        // post.isLike = post.like.includes(req.userId);
        return res.status(httpStatus.OK).json({
            data: book,
        });
    } catch (error) {
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({message: error.message});
    }
}
booksController.delete = async (req, res, next) => {
    try {
        let book = await BookModel.findByIdAndDelete(req.params.id);
        if (book == null) {
            return res.status(httpStatus.NOT_FOUND).json({message: "Can not find post"});
        }
        return res.status(httpStatus.OK).json({
            message: 'Delete book done',
        });
    } catch (error) {
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({message: error.message});
    }
}

booksController.list = async (req, res, next) => {
    try {
        // let books = [];
        // get Post of one user
        let books = await BookModel.find({}).populate({
            path: 'categories',
            select: '_id name',
            model: 'Categories',
        });
        return res.status(httpStatus.OK).json({
            data: books
        });
    } catch (error) {
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({message: error.message});
    }
}

booksController.search = async (req, res, next) => {
    try {
        let searchKey = new RegExp(req.body.keyword, 'i')
        let result = await BookModel.find({title: searchKey}).limit(20).exec();

        res.status(200).json({
            code: 200,
            message: "T??m ki???m th??nh c??ng",
            data: result
        });

    } catch (e) {
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            message: e.message
        });
    }
}
booksController.outstandingBook = async (req, res, next) => {
    try {
        let result = await BookModel.find({}).sort({numberStar: -1}).limit(8).exec();
        // let bookIds = [];
        // result?.map((item) => {
        //     bookIds.push(item.book)
        // })
        // let bookList = await BookModel.find({_id: {$in: bookIds}}).exec();
        res.status(200).json({
            data: result
        });

    } catch (e) {
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            message: e.message
        });
    }
}

module.exports = booksController;