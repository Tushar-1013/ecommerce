const productModel = require("D:\Tushar\tushar 2\Corsair\Final practice\new\schemas")


app.POST('/', async (req, res) => {
    let { name, category, subcategory, productdes, price } = req.body

    if (!name || !productdes || !price) return res.json({ message: "Name , description and price are required", status: 400 })

    let Product = await productModel.Create({
        name,
        category,
        subcategory,
        productdes,
        price,

    })
})