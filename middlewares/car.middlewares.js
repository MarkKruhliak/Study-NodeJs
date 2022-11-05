const {isObjectIdOrHexString} = require("mongoose")

module.exports = {
    checkIsIdValid: async (req, res, next) => {
        try {
            const {userId} = req.params
            if (!isObjectIdOrHexString(userId)) {
                return next(new Error("Not valid Id for car!"))
            }
            next()

        } catch (e) {
            next(e)
        }
    }

}
