const Auth = require('../DataBase/Auth')



module.exports = {
    saveToken (tokens) {
        return Auth.create(tokens)
    },

    getOneWithUser (filter) {
        return Auth.findOne(filter).populate('user')
    },

    deleteOneByParams (filter) {
        return Auth.deleteOne(filter)
    },

    deleteMany(filter) {
        return Auth.deleteMany(filter);
    },
}
