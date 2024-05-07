const express = require('express')
const app = express()
const {products, people} = require('./data')
app.get('/', (req, res)=>{
    res.status(200).send('<h1>HOME PAGE</h1>')
})

app.get('/about', (req, res)=>{
    res.status(200).send('<h1>ABOUT US PAGE</h1>')
})

app.get('/api/products', (req, res)=>{
    const {search, limit} = req.query
    let newProducts = products.map((product)=>{
        const {id, name, image} = product
        return {id, name, image}
    })
    if(search){
        newProducts = newProducts.filter((product)=>product.name.startsWith(search))
    }
    if(limit){
        return res.status(200).json(newProducts.slice(0, Number(limit)))
    }
    if(newProducts.length < 1){
        return res.status(200).json({success: true, data: []})
    }

    return res.status(200).json(newProducts)
})

app.get('/api/products/:productId', (req, res)=>{
    const {productId} = req.params
    const singleProduct = products.find((product)=>product.id === Number(productId))

    if(!singleProduct){
        return res.status(404).send('Product does not exist')
    }
    
    return res.status(200).json(singleProduct)
})



app.all('*', (req, res)=>{
    res.status(404).send('<h1>RESOURCE NOT FOUND</h1>')
})



app.listen(5000, ()=>{
    console.log('Server is listening on port 5000....')
})