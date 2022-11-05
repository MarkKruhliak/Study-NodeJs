const express = require('express')
const axios = require('axios')
const fileUpload = require('express-fileupload')

const mongoose = require('mongoose');
require('dotenv').config();
const morgan = require('morgan')
// const bcrypt = require('bcrypt')


const {HOST, Data_Basa} = require("./configs/configs");
const runCronJobs = require('./cron')
const {authRouter, carRouter, userRouter} = require("./routes");
const {S3_BUCKET_URL} = require("./configs/configs");
const {reject} = require("bcrypt/promises");

const app = express();

async function getter(a, b) {
    return a + b
}

console.log(getter(1,3));

//
// class User {
//     constructor(options) {
//         this.options = options
//     }
//
//     sayHi(params) {
//         console.log(params);
//     }
// }
//
// function generateexpress(a) {
//     const item = []
//     item.push('Hello word' + a)
//     return item
// }

// const result = generateexpress(3)
// console.log(result);

//
// function maper(array, callback) {
//     let result = [];
//     for (let i = 0; i < array.length; i++) {
//         if (callback(array[i])) {
//             result.push(array[i])
//         }
//     }
//     return result
// }
//
// const result2 = maper(array, function (item) {
//     return item < 25
// })
// console.log(result2);
// console.log(array);

// function filterAray(array, callback) {
//     let result = [];
//     for (let i = 0; i < array.length; i++) {
//         let context = array[i]
//         if (callback(result)){
//              result.push(context)
//         }
//
//     }
//     return result;
// }
//
// filterAray(array,function (item) {
//     console.log(item > 120);
// })


// console.log(result('Mark',12));

// console.log(result2);
// const mainer = new User({name: 'Mark'})
// console.log(mainer);
// mainer.sayHi({
//     name:'Mark',
//     age: 22
// })


// function Owner(options) {
//     this.options = options
//     // this.age = age
//     this.start = function (params) {
//         console.log(params);
//     }
//     }


// const item =  new Owner({
//     name: 'Mark',
//     age: '22',
//     owner: 'we look for you man'
// })
// console.log(item);
// item.start({
//     name: 'Mark',
//     age: 22
// })

// const item = 'hello, my, dear, friend'
// const item2 = [2,'mark', 'life is good']
// const result = item.split(',')
// const result2 = item2.join('-')


// console.log(result);
// console.log(result2);


app.use(morgan('dev'))
app.use(fileUpload({}))

// function generateHash (password) {
//    return bcrypt.hashSync(password, 10)
// }
// function compareHash( password, hashed) {
//     return bcrypt.compareSync(password, hashed )
// }
//
// console.log(compareHash('password123', '$2b$10$IkgcYCCy8Bj.OWMjw.WaWOgQgTf8rCnmXT9K8LKRsSYhoCsGxzIXu'));

// $2b$10$IkgcYCCy8Bj.OWMjw.WaWOgQgTf8rCnmXT9K8LKRsSYhoCsGxzIXu

app.use(express.json());
app.use(express.urlencoded({extended: true}))

app.use('/auth', authRouter)
app.use('/users', userRouter)
app.use('/cars', carRouter)

// app.get('/cars', ( async (req, res, next) => {
//     let allUsers = await Car.find()
//     res.json(allUsers)
// }))
// app.post('/cars', ((req, res) => {
//     console.log(req.body);
//     Car.create(req.body)
//     res.json("Have good")
// }))

app.use((err, req, res, next) => {
    res.status(404).json(err.message || "Here must be massage from Error")
})

app.listen(HOST, () => {
    console.log('Have started')
    mongoose.connect(Data_Basa);

    runCronJobs()
})

