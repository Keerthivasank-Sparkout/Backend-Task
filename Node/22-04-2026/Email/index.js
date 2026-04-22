require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const User = require('./model');
const jwtSigning = require('./utils/jwt')
const { auth } = require('./middleware/auth');
const sendEmail = require('./utils/email');
const EmailTemplate = require('./utils/mailTemplate')
const app = express();
app.use(express.json())

//DB configuration
const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DB_PASSWORD);
mongoose.connect(DB)
    .then(() => console.log("MongoDb connected successfully"))
    .catch((err) => console.log(err))

const isValid = (inputOtp, userOtp, expire) => {

    if (expire < Date.now()) {
        return {
            message: "OTP Expired",
            verified: false
        };
    }

    if (inputOtp !== userOtp) {
        return {
            message: "Invalid OTP",
            verified: false
        };
    }

    return {
        message: "Verified",
        verified: true
    };
};


//Routes
app.post("/login", async (req, res) => {
    const { email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
        return res.status(400).json({
            status: 'Failed!!',
            message: 'User Not Found, check email and password'
        })
    }
    const isMatch = await existingUser.comparePassword(password);
    if (isMatch) {
        const token = jwtSigning({
            id: existingUser._id,
            email: existingUser.email,
            role: existingUser.role
        })
        return res.status(200).json({
            status: 'Success!!',
            message: "Login Success!!",
            user: existingUser,
            token
        })
    }
    else {
        return res.status(401).json({
            status: 'Failed!!',
            message: "invalid email and password!!",
        })
    }
})
app.post('/register', async (req, res) => {
    const { ...payload } = req.body;
    const exitingUser = await User.findOne({ email: payload.email });
    if (exitingUser) {
        return res.status(401).json({
            status: 'Failed!!',
            message: "user already exist!!",
        })
    }
    let newUser = await User.create(payload);
    // newUser = newUser.toObject();
    // delete newUser.password
    const message = `Your Email verification OTP is ${newUser.otp}`
    await sendEmail({
        to: newUser.email,
        sub: "Email Verification",
        html:EmailTemplate(message)
    })
    return res.status(200).json({
        status: 'Success!!',
        message: "Verify email to login!!",
    })

})
app.post('/verify-otp', async (req, res) => {
    try {
        const { email, otp } = req.body;

        const user = await User.findOne({ email }).select('otp otpExpire');

        if (!user) {
            return res.status(400).json({
                status: 'Failed',
                message: 'User not found'
            });
        }

        const result = isValid(otp, user.otp, user.otpExpire);
        let token;
        if (result.verified) {
            token = jwtSigning({
                id: user._id,
                email: user.email,
                role: user.role
            })
            user.otp = null;
            user.otpExpire = null;
            await user.save();
        }

        return res.status(result.verified ? 200 : 400).json({
            status: result.verified ? 'Success' : 'Failed',
            message: result.message,
            token
        });

    } catch (err) {
        return res.status(500).json({
            status: 'Error',
            message: err.message
        });
    }
});
app.get('/users', auth, async (req, res) => {
    const user = await User.find();
    return res.status(200).json({
        status: 'Success!!',
        message: "Accounts fetch!!",
        user
    })
})
app.listen(3000, () => {
    console.log("server running on port:3000")
})