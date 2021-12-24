const mongoose = require('mongoose');
const Product=require('./models/product'); 

mongoose.connect('mongodb://localhost:27017/smartphones', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("MONGO CONNECTION OPEN!!!")
    })
    .catch(err => {
        console.log("OH NO MONGO CONNECTION ERROR!!!!")
        console.log(err)
    })

    // const p=new Product({
    //     name:'iphone XR',
    //     price:30000,
    //     category:'ios'
    // })
    // p.save().then(p =>{
    //     console.log(p)
    // })
    // .catch(e =>{
    //     console.log(e)
    // })

    const seedProducts=[
        {
            name:'iphone 11',
            price:50000,
            category:'ios'
        },
        {
            name:'samsung a30',
            price:9000,
            category:'android'
        },
        {
            name:'Nokia 1100',
            price:1000,
            category:'keypad'
        },
    ]
    Product.insertMany(seedProducts)
    .then(res =>{
        console.log(res)
    })
    .catch(e=>{
        console.log(e)
    })