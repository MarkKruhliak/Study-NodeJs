const {Router} = require('express')


const userController = require('../controllers/user.controller')
const userMiddlewares = require('../middlewares/user.middlewares')
const commonMDWL = require('../middlewares/common.middlewares')

const carMDWL = require('../middlewares/car.middlewares')
const {authMDLW, fileMDWL} = require("../middlewares");
const {newUserValidator} = require("../validators/user.validator");

const userRouter = Router();

userRouter.get('/',  userController.getAllUsers)
userRouter.post('/', userMiddlewares.checkIsUserEmailUnique , commonMDWL.checkIsBodyValid(newUserValidator), userController.createUser)

userRouter.get('/:userId', userMiddlewares.checkIsIdValid("userId"), userMiddlewares.isUserExist, authMDLW.checkIsAccessToken,  userController.getUserById)

userRouter.post(
    '/:userId/avatar',
    userMiddlewares.checkIsIdValid("userId"),
    fileMDWL.checkUploadedAvatar,
    userMiddlewares.isUserExist,
    userController.uploadAvatar);

userRouter.delete(
    '/:userId/avatar/:imageId',
    userMiddlewares.checkIsIdValid("userId"),
    userMiddlewares.checkIsIdValid("imageId"),
    userMiddlewares.isUserExist,
    userController.deleteImages);



userRouter.get(
    '/:userId/avatar',
    userMiddlewares.checkIsIdValid("userId"),
    userMiddlewares.isUserExist,
    userController.getImages);

userRouter.put('/:userId', carMDWL.checkIsIdValid, userMiddlewares.isUserExist, userMiddlewares.checkIsUserEmailUnique, userController.updateUserById)
userRouter.delete('/:userId', userController.deleteUserById)


module.exports = userRouter;
