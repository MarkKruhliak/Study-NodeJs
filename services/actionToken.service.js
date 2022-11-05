const ActionToken = require('../DataBase/ActionToken')

module.exports = {
    createActionToken: (dataToInsert) => ActionToken.create(dataToInsert),
    getOneByParamsWithUser: (searchParams) => ActionToken.findOne(searchParams).populate('user'),
    deleteOne: (deleteParams) => ActionToken.deleteOne(deleteParams)
}
