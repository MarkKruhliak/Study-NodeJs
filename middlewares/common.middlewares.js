module.exports = {
    checkIsBodyValid: (validatorType) => (req, res, next) => {
        try {
            const validate = validatorType.validate(req.body);

            if (validate.error) {
                return next(new Error(validate.error.message));
            }

            req.body = validate.value
            next()
        } catch (e) {
            next(e)
        }
    }
}

