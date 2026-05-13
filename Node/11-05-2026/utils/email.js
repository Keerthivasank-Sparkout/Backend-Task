const nodemailer = require('nodemailer');

const sendEmail = async (options)=>{
    const transport = nodemailer.createTransport({
        host:process.env.EMAIL_HOST,
        port:process.env.EMAIL_PORT,
        auth:{
            user:process.env.EMAIL_USER_NAME,
            pass:process.env.EMAIL_PASSWORD
        }
    })
    console.log(options.message)
    const mailOption ={
        from:process.env.EMAIL_USER_NAME,
        to:options.email,
        subject:options.subject,
        text:options.message
    };

    await transport.sendMail(mailOption)
}

module.exports = sendEmail;