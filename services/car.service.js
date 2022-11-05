const Car = require('../DataBase/Car')

module.exports = {

    getCarsByParams(filter) {
        return Car.find(filter);
    },

}
