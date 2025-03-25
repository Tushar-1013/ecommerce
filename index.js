const DBconnection = require("./config/db")
const express = require("express")
const productData = require("./models/product.model.js")
const imgHandler = require('./config/multer.js')


const app = express()
DBconnection()
const PORT = 3000

app.set('view engine', 'ejs')
app.use(express.json())
app.use(express.urlencoded({ extended: true }))


app.get('/', (req, res) => {
    res.render('addproduct')
})

app.post('/', imgHandler.single('productImg'), async (req, res) => {

    let { productname, category, subcategory, productdes, price } = req.body

    if (!productname || !productdes || !price) return res.json({ message: "Name , description and price are required", status: 400 })

    let Product = await productData.create({
        productname,
        category,
        subcategory,
        productdes,
        price,

    })
    console.log(req.file, req.body);


})
app.listen(3000, () => {
    console.log(`Server running on Port : ${PORT}`);
})