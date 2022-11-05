const {authService, actionTokenService, previousPasswordService, tokenService} = require("../services");
const {constant} = require("../constans");
const {encodeXText} = require("nodemailer/lib/shared");

module.exports = {
    checkIsAccessToken: async (req, res, next) => {
        try {
            const access_token = req.get(constant.AUTHORIZATION)

            console.log(access_token);

            if (!access_token) {
                return next(new Error('No token'))
            }

            const result = await authService.getOneWithUser({access_token})

            // console.log(result);

            if (!result) {
                return next(new Error('Not valid token'))
            }

            req.info = result;
            next()
        } catch (e) {
            next(e)
        }
    },

    checkActionToken: (tokenType) => async (req, res, next) => {
        try {
            const token = req.get(constant.AUTHORIZATION)

            if (!token) {
                return new Error("No token")
            }

            const tokenInfo = await actionTokenService.getOneByParamsWithUser({tokenType, token})

            if (!tokenInfo) {
                return new Error('Not valid Token')
            }

            req.tokenInfo = tokenInfo
            next()
        } catch (e) {
            next(e)
        }
    },

    checkPreviousPassword: async (req, res, next) => {
        try {
           const {user} = req.tokenInfo
            const {password} = req.body

            const oldPassword = await previousPasswordService.getByUserId(user.id)

            await tokenService.compareHash( password)

        } catch (e) {
            next(e)
        }
    }
}
