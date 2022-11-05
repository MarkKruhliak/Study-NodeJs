const dayJs = require('dayjs')
const utc = require('dayjs/plugin/utc')

const {authService} = require('../services')

dayJs.extend(utc)

module.exports = async () => {
    const oneMonthBeforeNow = dayJs()
        .utc()
        .subtract(1,'month')

    const deleteInfo = await authService.deleteMany({
        createdAt: {$lte: oneMonthBeforeNow}

    })
    console.log(deleteInfo);
}
