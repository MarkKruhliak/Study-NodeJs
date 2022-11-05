const {fileConstants} = require("../constans");
module.exports = {
    checkUploadedAvatar:  (req, res, next) => {
        try {
            const {avatar} = req.files

            if (!req.files || req.file.avatar){
                return next(new Error('No avatar'))
            }


            if (avatar.size > fileConstants.IMAGE_MAX_SIZE){
                return next(new Error("File too big"))
            }

            if (!fileConstants.IMAGES_MIMETYPES.includes(avatar.mimetype)){
                return next(new Error("Wrong file type"))
            }

        } catch (e) {
            next()

        }
    }
}
