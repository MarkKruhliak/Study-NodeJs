module.exports = {
    HOST : process.env.HOST,
    Data_Basa: process.env.Data_Basa || 'mongodb://localhost:21017/default-mar-db',

    NO_REPLY_EMAIL : process.env.NO_REPLY_EMAIL || 'example@gmail.com',
    NO_REPLY_PASSWORD: process.env.NO_REPLY_PASSWORD,

    FRONTEND_URL : process.env.FRONTEND_URL || 'example.com',


    S3_BUCKET_NAME: process.env.S3_BUCKET_NAME,
    S3_BUCKET_REGION: process.env.S3_BUCKET_REGION,
    S3_ACCESS_KEY: process.env.S3_ACCESS_KEY,
    S3_SECRET_KEY:process.env.S3_SECRET_KEY,
    S3_BUCKET_URL:process.env.S3_BUCKET_URL

}


