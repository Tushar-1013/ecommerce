const userModel = require("../models/user.model");
const bcrypt = require('bcrypt')


const userController = async (req, res) => {
    let { username, email, password, confirmpass } = req.body


    if (!username || !email || !password || !confirmpass) return res.status(400).json({ message: "All fields are required" })

    let existinguser = await userModel.findOne({ email })
    if (existinguser) return res.json("User with this emial already registered")
    if (password != confirmpass) return res.status(400).json({ message: "Passwords must match" })


    let hashPass = await bcrypt.hash(password, 10)

    let user = await userModel.create({
        name: username,
        email,
        password: hashPass,
    })

    res.render('login')
}

module.exports = userController