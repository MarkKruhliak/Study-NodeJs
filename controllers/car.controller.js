const {Car} = require("../DataBase");
const {carService, userService} = require("../services");

module.exports = {

    createCar: async (req, res, next) => {
        try {
            const {_id} = req.info.user

            let car = await Car.create({...req.body, user: _id})
            console.log(car._id);

            const userCars = await carService.getCarsByParams({user: _id})
            console.log(userCars);

            await userService.updateById(_id, {cars: [
                    ...userCars,
                    car._id
                ]})

            res.json(car)
            next()
        } catch (e) {
            next(e)
        }
    },

    getAllCars: async (req, res, next) => {
        try {
            let allCars = await Car.find()
            res.json(allCars)
            next()
        } catch (e) {
            next(e)
        }
    },

    getOneCar: async (req, res, next) => {
        try {
            const {userId} = req.params
            let oneCarById = await Car.findById(userId)

            if (!oneCarById) {
                next(new Error('User not found!!!'))
            }

            res.json(oneCarById)
            next()
        } catch (e) {
            next(e)
        }
    }
}
