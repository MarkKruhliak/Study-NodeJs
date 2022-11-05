const {userService} = require("../services");
const {isObjectIdOrHexString} = require("mongoose")

const {User} = require("../DataBase");
const {userValidator} = require("../validators");

module.exports = {

    getUserDynamicaly: (from = 'body', fildName = 'userId', dbFiled = fildName) => {
        return async function (req, res, next) {
            try {
                const filedToSearch = req[from][fildName]
                console.log(filedToSearch);


                const user = await User.findOne({[dbFiled]: filedToSearch})


                if (!user) {
                    return next(new Error("User not found!"))
                }
                console.log(user);
                req.user = user;

                next()

            } catch (e) {
                next(e)
            }
        }
    },

    checkIsIdValid: (fieldName, from = "params") => async (req, res, next) => {
        try {
            if (!isObjectIdOrHexString(req[from][fieldName])) {
                return next(new Error("Not valid Id"))
            }
            next()
        } catch (e) {
            next(e);
        }
    },

    isUserExist: async (req, res, next) => {
        try {
            const {userId} = req.params
            const user = await userService.getOneById(userId)


            if (!user) {
                return next(new Error("User not found!"))
            }

            next()
        } catch (e) {
            next(e);
        }
    },

    checkIsUserBodyValid: async (req, res, next) => {
        try {
            const validate = userValidator.newUserValidator.validate(req.body)

            if (validate.error){
                return next(new Error(validate.error.message))
            }

            next()
        } catch (e) {
            console.log(e);
            next(e)
        }
    },

    checkIsUserEmailUnique: async (req, res, next) => {
        try {
            const {email} = req.body
            const {userId} = req.params

            const userByEmail = await userService.getOneParams({email, _id: { $ne: userId}})



            if (userByEmail) {
                return next(new Error("This email already exist!"))
            }


            next();
        } catch (e) {
            console.log(e);
            next(e)
        }
    }
}
