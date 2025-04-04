const bcrypt = require('bcrypt')
const userModel = require('../models/user.model')
const Jwt = require('jsonwebtoken')

const userLoginController = async (req, res) => {

    let { email, password } = req.body
    console.log(req.body);

    if (!email || !password) return res.status(400).json({ message: "all fields are required" })

    let user = await userModel.findOne({ email: email })
    if (!user) return res.json({ message: "User not found" })

    let isValidPassword = await bcrypt.compare(password, user.password)
    if (!isValidPassword) return res.json({ message: "Invalid Email or Password" })

    let token = Jwt.sign({ id: user._id, name: user.name }, "hahaha")

    res.cookie('token', token)
    res.redirect('addproducts')
}

module.exports = userLoginController