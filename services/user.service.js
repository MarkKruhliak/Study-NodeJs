const User = require('../DataBase/User')

module.exports = {
    createUser(userObject) {
        return User.create(userObject)


    },

    getOneById(id) {
        return User.findById(id).populate('cars')
    },

    updateById(userId, userObject) {
        return User.updateOne({_id: userId}, userObject, {new: true})
    },

    getOneParams(filter) {
        return User.findOne(filter)
    },

    deleteUserById(userId) {
        return User.deleteOne({_id: userId})
    },

    updateUserById(userId, newUserObject) {
        return User.findOneAndUpdate({ _id: userId }, newUserObject, { new: true });
    },
}
