const CategoriesModel = require("../model/Categories");
const httpStatus = require("../utils/httpStatus");
const categoriesController = {};
categoriesController.create = async (req, res, next) => {
    try {
        let userId = req.userId;
        const {
            name
        } = req.body;

        const Categories = new CategoriesModel({
            name: name,
            total: 0
        });

        let category = await Categories.save();
        return res.status(httpStatus.OK).json({
            category: category
        });
    } catch (e) {
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            message: e.message
        });
    }
}

categoriesController.show = async (req, res, next) => {
    try {
        let categories = await CategoriesModel.find({}).populate('Categories', [
            'name', 'total'
        ]);
        return res.status(httpStatus.OK).json({
            data: categories
        });
    } catch (error) {
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({message: error.message});
    }

}

module.exports = categoriesController;