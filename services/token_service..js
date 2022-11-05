const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')



module.exports = {
    generateHash: function (password) {
        return bcrypt.hashSync(password, 10)
    },
    compareHash: function (password, hashed) {
        return bcrypt.compareSync(password, hashed)
    },
    // hashPassword: (password) => bcrypt.hash(password, 10),
    // comparePassword: async (password, hashPassword) => {
    //     const isPasswordSame = await bcrypt.compareSync(password, hashPassword,)
    //     console.log(isPasswordSame);
    //
    //     if (!isPasswordSame) {
    //         throw new Error("Wrong email or password")
    //     }
    // },

    createActionToken: (payload = {}) => {
        return jwt.sign(payload, 'FORGOT_PASS_TOKEN_SECRET', {expiresIn: '7d'})
    },

    createAuthTokens: (payload = {}) => {
        const access_token = jwt.sign(payload, "ACCESS_WORD", {expiresIn: '15m'});
        const refresh_token = jwt.sign(payload, "REFRESH_TOKEN", {expiresIn: "30d"});
        return {
            access_token,
            refresh_token
        }
    }
}
