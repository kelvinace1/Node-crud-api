require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const Product = require('./models/productModel')
const productRoute = require('./routes/productRoute')
const errorMiddleware = require('./middleware/errorMiddleware')
const cors = require('cors')
const app = express()

const PORT = process.env.PORT || 3000
const MONGO_URL = process.env.MONGO_URL

app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use('/api/products', productRoute)


app.get('/', (req, res) =>{
    res.send("hello world")
})


app.use(cors())
app.use(errorMiddleware)
mongoose.connect(MONGO_URL)
.then(()=>{
    app.listen(PORT, ()=> {
        console.log(`server is running on port ${PORT}`)
    })
    console.log("connected to mongodb")
})
.catch((error) => {
    console.log(error)
})