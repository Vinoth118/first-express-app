const express = require('express');
const router = express.Router();
const User = require('../models/user');
const { generateHashValue, validateWithHashValue } = require('../utils/hashing');
const { generateToken } = require('../utils/token');

router.post('/register', async (req, res) => {
    try {
        const isEmailExist = await User.findOne({email: req.body.email});
        if(!isEmailExist) {
            const hashedPassword = await generateHashValue(req.body.password);
            const user = new User({
                userName: req.body.userName,
                email: req.body.email,
                password: hashedPassword
            });
            const tryToSaveUser = await user.save();
            res.status(200).json({
                success: true,
                data: user
            })
        } else {
            res.status(500).json({ 
                success: false,
                message: "Email is Already Taken"
            })
        }
    } catch (error) {
        res.status(500).json({ 
            success: false, 
            message: error.message 
        })
    }
})

router.post('/login', async (req, res) => {
    try {
        const user = await User.findOne({email: req.body.email})
        if(!user) {
            res.status(404).json({
                success: false,
                message: "Invalid Email or Password"
            })
        } else {
            const validatePassword = await validateWithHashValue(req.body.password, user.password)
            if(!validatePassword) {
                res.status(404).json({
                    success: false,
                    message: "Invalid Email or Password"
                })
            } else {
                const token = await generateToken(user.email);
                res.status(200).json({
                    success: true,
                    token: token,
                    data: {
                        userName: user.userName,
                        email: user.email
                    }
                })
            }
        }
    } catch (error) {
        res.status(500).json({ 
            success: false, 
            message: error.message 
        })
    }
})

module.exports = router;