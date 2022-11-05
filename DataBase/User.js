const {Schema, model} = require('mongoose')
const tokenService = require("../services/token_service.");

const UserSchema = new Schema({
        name: {type: String, trim: true, required: true},
        age: {type: Number, default: 18},
        email: {type: String, trim: true, lowercase: true, required: true},
        password: {type: String, lowercase: true, required: true},
        avatar: {type: String, default: ''},
        cars: {
            type: [Schema.Types.ObjectId],
            ref: 'car',
            // select: false
        }
    },
    {
        timestamps: true,
        versionKey: false
    });

UserSchema.statics = {
    testStatic() {
        console.log("This is state")
    },

    async createUserWithHashPassword(userObject = {}) {

        const hashPassword = await tokenService.generateHash(userObject.password)

        return this.create({...userObject, password: hashPassword})


    }
}

UserSchema.methods = {
    async checkIsPasswordSame(password){
        await tokenService.compareHash(password , this.password)
    }


}



module.exports = model('user', UserSchema)
