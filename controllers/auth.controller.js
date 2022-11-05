const {authService, tokenService, emailService, actionTokenService, userService} = require("../services");
const {FRONTEND_URL} = require('../configs/configs')
const {tokenTypeEnum, emailActionEnum, constant} = require("../constans");
const {sendEmail} = require("../services/email.service");

module.exports = {
    login: async (req, res, next) => {
        try {
            const {password} = req.body;
            // console.log(password);
            const { _id } = req.user
            console.log(req.user.id);

            // console.log(hashPassword);
            // console.log(password);

            await req.user.checkIsPasswordSame(password)

            const authTokens = tokenService.createAuthTokens({_id})


            await authService.saveToken({...authTokens, user: _id})

            await sendEmail('mark45ua@gmail.com', 'welcome');

            res.json({
                ...authTokens,
                user: req.user
            })

        } catch (e) {
            next(e)
        }
    },

    logout: async (req, res, next) => {

        const {user, access_token} = req.info

        await authService.deleteOneByParams({user: user._id, access_token})

        res.json('Everything Ok')
    },

    forgotPassword: async (req, res, next) => {
        try {
            const {email, _id} = req.user


            const actionToken = tokenService.createActionToken(tokenTypeEnum.FORGOT_PASSWORD, {_id})
            const url = `${FRONTEND_URL}/password/forgot-pass-page?token=${actionToken}`;

            await emailService.sendEmail('mark45ua@gmail.com', emailActionEnum.FORGOT_PASSWORD, {url})

            await actionTokenService.createActionToken({
                tokenType: tokenTypeEnum.FORGOT_PASSWORD,
                user: _id,
                token: actionToken
            })

            res.json(actionToken)

        } catch (e) {
            next(e)
        }
    },

        setNewPasswordForgot: async (req, res, next) => {
        try {
            const {user} = req.tokenInfo
            const {password} = req.body
            const token = req.get(constant.AUTHORIZATION)

            await authService.deleteMany({user: user._id})
            await actionTokenService.deleteOne({token})

            const hashPassword = await tokenService.generateHash(password)
            await userService.updateUserById(user._id, {password: hashPassword})

            res.json('Ok')

        } catch (e) {
            next(e)
        }

    }
}
