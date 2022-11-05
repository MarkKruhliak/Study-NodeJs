const {Router} = require('express')

const authController = require('../controllers/auth.controller')
const {commonMDWL, authMDLW, userMDWL} = require("../middlewares");
const {userPasswordValidator} = require("../validators/user.validator");
const {tokenTypeEnum} = require("../constans");

const authRouter = Router()

authRouter.post('/login', userMDWL.getUserDynamicaly('body', 'email'), authController.login)
authRouter.post('/logout', authMDLW.checkIsAccessToken, authController.logout)
authRouter.post('/password/forgot', userMDWL.getUserDynamicaly('body', 'email'), authController.forgotPassword)
authRouter.put('/password/forgot', commonMDWL.checkIsBodyValid(userPasswordValidator), authMDLW.checkActionToken(tokenTypeEnum.FORGOT_PASSWORD), authController.setNewPasswordForgot)


module.exports = authRouter;
