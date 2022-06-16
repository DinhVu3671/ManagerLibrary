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
            username,
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
            username: username,
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
                    username: savedUser.username,
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