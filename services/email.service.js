const nodemailer = require('nodemailer')
const EmailTemplates = require('email-templates')
const {NO_REPLY_EMAIL, NO_REPLY_PASSWORD, FRONTEND_URL} = require("../configs/configs");
const emailTemplatesObj = require('../email-templates/index')
const path = require("path");


const sendEmail = async (userEmail, emailAction, locals) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: NO_REPLY_EMAIL,
            pass: NO_REPLY_PASSWORD
        }
    });

    const templateParser = new EmailTemplates({
        views: {
            root: path.join(process.cwd(), 'email-templates')
        }
    })

    const emailInfo = emailTemplatesObj[emailAction]

    if (!emailInfo){
        return new Error('Wrong template Name')
    }

    const html = await templateParser.render(emailInfo.templateName, {...locals, frontendURL: FRONTEND_URL})
    console.log(FRONTEND_URL);


    return transporter.sendMail({
        from: 'No repley 2022',
        to: userEmail,
        subject: emailInfo.subject,
        html
    })
}

module.exports = {
    sendEmail
}
