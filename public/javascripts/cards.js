
const productData = require('../../models/product.model')

let card = document.getElementById('product')


async function fetchprod() {

    let products = await productData.find()
    console.log(products);


    let productHtml = products.map(product => `
        <div id = "product">
            <h3>${product.name}</h3>
        </div>`).join('')

    card.innerHTML = productHtml
}


fetchprod()

