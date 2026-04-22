const nodemailer = require('nodemailer')

const sendEmail = async (option) => {
    const transport = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    })

    const mailOption = {
        from: process.env.EMAIL_USER,
        to: option.to,
        subject: option.sub,
        html: option.html
    }
    await transport.sendMail(mailOption)
}

module.exports = sendEmail