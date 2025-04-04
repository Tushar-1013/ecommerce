const DBconnection = require("./config/db")
const express = require("express")
const productData = require("./models/product.model.js")
const imgHandler = require('./config/multer.js')
const registerRoute = require('./routes/register.routes.js')
const loginRoute = require('./routes/login.routes.js')
const path = require("path")
const jwt = require('jsonwebtoken')
const { log } = require("console")



const app = express()
DBconnection()
const PORT = 3000

app.set('view engine', 'ejs')
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'public')));


app.get('/addproduct', (req, res) => {
    res.render('addproduct')
})

app.post('/addproducts', imgHandler.single('productImg'), async (req, res) => {



    let { productname, category, subcategory, productdes, price } = req.body
    let productImg = req.file?.path
    console.log(productImg);

    if (!productname || !productdes || !price) return res.json({ message: "Name , description and price are required", status: 400 })

    let Product = await productData.create({
        productname,
        category,
        subcategory,
        productdes,
        price,
        img: productImg,

    })



})

app.post('/home', async (req, res) => {
    let verificationToken = req.headers?.cookie?.split("=")[1]
    if (!verification) return res.json({ message: "please login to access this page", status: 401 })

    let decoded = jwt.verify(verificationToken, "hahaha")

    if (!decoded) return res.json({ message: "user not verified. please login again" })


    let user = await userModel.findOne({ _id: decoded.id })

    if (!user) return res.json({ message: 'Invalid user', status: 400 })
    res.render('profile', { user })
})


app.use('/signup', registerRoute)
app.get('/signup', (req, res) => {
    res.render('signup')
})

app.use('/login', loginRoute)
app.get('/login', (req, res) => {
    res.render('login')
})

app.get('/', async (req, res) => {

    let products = await productData.find({})
    console.log(products);

    res.render('home', { products })
})

app.get('/addproducts', (req, res) => {
    let token = req.headers?.cookie?.split('=')[1]
    if (!token) return res.redirect('login');

    let user = jwt.verify(token, 'hahaha')

    res.render('addproducts', { user })
    console.log(user.name);

})
app.get('/logout', (req, res) => {
    res.clearCookie('token')

    res.redirect('login')
})

app.listen(3000, () => {
    console.log(`Server running on Port : ${PORT}`);
})