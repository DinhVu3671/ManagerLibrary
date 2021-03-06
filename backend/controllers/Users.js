const jwt = require("jsonwebtoken");
const UserModel = require("../model/Users");
// const DocumentModel = require("../models/Documents");
const httpStatus = require("../utils/httpStatus");
const bcrypt = require("bcrypt");
const {JWT_SECRET} = require("../constants/constants");
// const uploadFile = require('../functions/uploadFile');
const usersController = {};

usersController.register = async (req, res, next) => {
    try {
        const {
            fullName,
            phone,
            gmail,
            password
        } = req.body;

        let user = await UserModel.findOne({
            phone: phone
        })

        if (user) {
            return res.status(httpStatus.BAD_REQUEST).json({
                message: 'Phone number already exists'
            });
        }
        //Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        // let avatar  = await DocumentModel.findById("60c39f54f0b2c4268eb53367");
        // let coverImage  = await DocumentModel.findById("60c39eb8f0b2c4268eb53366");
        user = new UserModel({
            fullName: fullName,
            phone: phone,
            role: "user",
            password: hashedPassword,
            gmail: gmail

            // avatar: "60c39f54f0b2c4268eb53367",
            // cover_image: "60c39eb8f0b2c4268eb53366"
        });

        try {
            const savedUser = await user.save();

            // login for User
            // create and assign a token
            const token = jwt.sign(
                {username: savedUser.username, firstName: savedUser.firstName, lastName: savedUser.lastName, id: savedUser._id},
                JWT_SECRET
            );
            res.status(httpStatus.CREATED).json({
                data: {
                    id: savedUser._id,
                    fullName: savedUser.fullName,
                    phone: savedUser.phonenumber,
                    role: savedUser.role,
                    gmail: savedUser.gmail
                },
                token: token
            })
        } catch (e) {
            return res.status(httpStatus.BAD_REQUEST).json({
                message: e.message
            });
        }
    } catch (e) {
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            message: e.message
        });
    }
}
usersController.login = async (req, res, next) => {
    try {
        const {
            phone,
            password
        } = req.body;
        const user = await UserModel.findOne({
            phone: phone
        })
        if (!user) {
            return res.status(httpStatus.BAD_REQUEST).json({
                message: 'Username or password incorrect'
            });
        }

        // password
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(httpStatus.BAD_REQUEST).json({
                message: 'Username or password incorrect'
            });
        }

        // login success

        // create and assign a token
        const token = jwt.sign(
            {username: user.username, firstName: user.firstName, lastName: user.lastName, id: user._id},
            JWT_SECRET
        );
        delete user["password"];
        return res.status(httpStatus.OK).json({
            data: {
                id: user._id,
                phone: user.phone,
                role: user.role,
                fullName: user.fullName
            },
            token: token
        })
    } catch (e) {
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            message: e.message
        });
    }
}
usersController.edit = async (req, res, next) => {
    try {
        let userId = req.userId;
        let user;
        const {
            fullName,
            gmail,
        } = req.body;
        const dataUserUpdate = {};
        const listPros = [
            "fullName",
            "gmail",
        ];
        for (let i = 0; i < listPros.length; i++) {
            let pro = listPros[i];
            if (req.body.hasOwnProperty(pro)) {
                switch (pro) {
                    case "fullName":
                        if (fullName && fullName.trim().length > 0 ) {
                            dataUserUpdate[pro] = fullName.trim();
                        }
                        break;
                    case "gmail":
                        if (gmail && gmail.trim().length > 0 ) {
                            dataUserUpdate[pro] = gmail.trim();
                        }
                        break;
                    default:
                        dataUserUpdate[pro] = req.body[pro];
                        break;
                }
            }
        }
        user = await UserModel.findOneAndUpdate({_id: userId}, dataUserUpdate, {
            new: true,
            runValidators: true
        });

        if (!user) {
            return res.status(httpStatus.NOT_FOUND).json({message: "Can not find user"});
        }
        user = await UserModel.findById(userId).select('fullName phone gmail');
        return res.status(httpStatus.OK).json({
            data: user
        });
    } catch (e) {
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            message: e.message
        });
    }
}
usersController.changePassword = async (req, res, next) => {
    try {
        let userId = req.userId;
        let  user = await UserModel.findById(userId);
        if (user == null) {
            return res.status(httpStatus.UNAUTHORIZED).json({
                message: "UNAUTHORIZED"
            });
        }
        const {
            currentPassword,
            newPassword,
        } = req.body;
        // password
        const validPassword = await bcrypt.compare(currentPassword, user.password);
        if (!validPassword) {
            return res.status(httpStatus.BAD_REQUEST).json({
                message: 'Current password incorrect',
                code: 'CURRENT_PASSWORD_INCORRECT'
            });
        }

        //Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedNewPassword = await bcrypt.hash(newPassword, salt);

        user = await UserModel.findOneAndUpdate({_id: userId}, {
            password: hashedNewPassword
        }, {
            new: true,
            runValidators: true
        });

        if (!user) {
            return res.status(httpStatus.NOT_FOUND).json({message: "Can not find user"});
        }

        // create and assign a token
        const token = jwt.sign(
            {username: user.username, firstName: user.firstName, lastName: user.lastName, id: user._id},
            JWT_SECRET
        );
        user = await UserModel.findById(userId).select('phonenumber gender birthday avatar cover_image blocked_inbox blocked_diary').populate('avatar').populate('cover_image');
        return res.status(httpStatus.OK).json({
            data: user,
            token: token
        });
    } catch (e) {
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            message: e.message,
        });
    }
}
usersController.show = async (req, res, next) => {
    try {
        let user = await UserModel.find({role: "user"}).select('_id fullName phone gmail updatedAt');
        if (user == null) {
            return res.status(httpStatus.NOT_FOUND).json({message: "Can not user"});
        }

        return res.status(httpStatus.OK).json({
            data: user
        });
    } catch (error) {
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({message: error.message});
    }
}
usersController.searchUser = async (req, res, next) => {
    try {
        let searchKey = new RegExp(req.body.keyword, 'i')
        let result = await UserModel.find({phone: searchKey}).limit(10).exec();

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
usersController.showUser = async (req, res, next) => {
    try {
        let userId = null;
        if (req.params.id) {
            userId = req.params.id;
        } else {
            userId = req.userId;
        }
        let user = await UserModel.findById(userId).select('_id fullName phone gmail updatedAt');
        if (user == null) {
            return res.status(httpStatus.NOT_FOUND).json({message: "Can not user"});
        }

        return res.status(httpStatus.OK).json({
            data: user
        });
    } catch (error) {
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({message: error.message});
    }
}

module.exports = usersController;