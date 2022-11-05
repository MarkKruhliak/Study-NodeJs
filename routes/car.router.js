const {Router} = require('express')

const carController = require('../controllers/car.controller')
const carService = require("../middlewares/car.middlewares")
const {authMDLW} = require("../middlewares");
// const {Car} = require("../DataBase");
const carRouter = Router();



carRouter.get('/', carController.getAllCars)
carRouter.get('/:userId', carService.checkIsIdValid, carController.getOneCar)
carRouter.post('/', authMDLW.checkIsAccessToken, carController.createCar)

module.exports = carRouter;
