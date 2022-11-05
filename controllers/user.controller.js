const {userService, s3Service, imageService} = require("../services");
const User = require("../DataBase/User")
const {constant} = require("../constans");


module.exports = {

    getUserById: async (req, res, next) => {
        try {
            const {userId} = req.params

            // if (Number.isNaN(+UserId) || UserId < 0) {
            //     throw new Error("Not valid userId")
            //
            // }

            const user = await userService.getOneById(userId)

            if (!user) {
                throw new Error('User not found')
            }

            res.json(user)

        } catch (e) {
            console.log(e);
            next(e)
        }

    },

    updateUserById: async (req, res, next) => {
        try {
            const {userId} = req.params
            const updateUser = req.body

            const user = await userService.updateById(userId, updateUser)
            res.json(user)

        } catch (e) {
            next(e)
        }
    },

    getAllUsers: async (req, res, next) => {
        try {
            const test = req.params
            console.log(test);
            let usersFromJson = await User.find()
            res.json(usersFromJson)

        } catch (e) {
            next(e)
        }// let usersFromJson = await fileService.getUsers();


    },

    createUser: async (req, res, next) => {
        // const {name, age} = req.body;
        // console.log(req.body);
        // if (Number.isNaN(+age) || age <= 0) {
        //     res.status(400).json("Wrong user age")
        //     return;
        // }

        // let userObject = await fileService.insertUsers({name, age});
        try {

            const object = await User.createUserWithHashPassword(req.body)

            // const hashPassword = await tokenService.generateHash(req.body.password)
            //
            // let object = await userService.createUser({...req.body, password: hashPassword})
            // console.log(object);
            res.status(201).json(object)

        } catch (e) {
            console.log(e);
            next(e)
        }
    },

    deleteUserById: async (req, res) => {
        // const {UserId} = req.params;
        // console.log(UserId)
        // //
        // // if (UserId === users[UserId]){
        // //
        // // }
        // if (Number.isNaN(+UserId) || +UserId < 0) {
        //     res.status(400).json("Wrong user id")
        //     return;
        // }
        //
        // const user = await fileService.deleteUser(+UserId)
        // console.log(user)

        // if (!user) {
        //     res.status(404).json("Sometimes is wrong!")
        //
        // }
        const {userId} = req.params;
        await userService.deleteUserById(userId);

    },

    uploadAvatar: async (req, res, next) => {
        try {
            const {userId} = req.params

            const data = await s3Service.uploadPublicFile(req.files.avatar, 'user', userId)
            // console.log(req.files.avatar);
            // console.log(userId);
            // console.log(data);

            await imageService.savePhotoInfo({
                image: data.Location,
                user: userId
            })
            await User.updateOne({_id: userId}, {avatar: data.Location})

            res.json(data)
        } catch (e) {
            next(e)
        }
    },

    getImages: async (req, res, next) => {
        try {
            const {userId} = req.params


            // console.log(req.files.avatar);
            // console.log(userId);
            // console.log(data);

            const image = await imageService.getByUserId({userId})
            console.log(image);

            res.json(image)
        } catch (e) {
            next(e)
        }
    },
    deleteImages: async (req, res, next) => {
        try {
            const {imageId} = req.params;
            // const { avatar } = req.user;

            const imageInfo = await imageService.getById(imageId);
            console.log(imageInfo.image);

            if (!imageInfo) {
                return next(new Error('Image not found'));
            }

            await Promise.all([
                s3Service.deleteFile(imageInfo.image),
                imageService.deleteImage({_id: imageId}),
            ]);

            res.json('everything Ok');
        } catch (e) {
            next(e);
        }
    }

}
