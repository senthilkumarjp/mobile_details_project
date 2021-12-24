const express=require('express');
const app=express();
const path=require('path');
const mongoose = require('mongoose');
const methodoverride=require('method-override')


const Product=require('./models/product'); 

mongoose.connect('mongodb://localhost:27017/smartphones', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("MONGO CONNECTION OPEN!!!")
    })
    .catch(err => {
        console.log("OH NO MONGO CONNECTION ERROR!!!!")
        console.log(err)
    })

app.use(express.static(path.join(__dirname,'public')))

app.set('views',path.join(__dirname,'views'));
app.set('view engine','ejs');

app.use(express.urlencoded({ extended: true }));
app.use(methodoverride('_method'))

const categories=['ios','android','keypad'];

app.get('/',(req,res)=>{
    res.render('welcome')
})

app.get('/home',(req,res)=>{
    res.render('home')
})

app.get('/products', async(req,res)=>{
const {category}=req.query;
if(category){
    const products=await Product.find({category})
    res.render('index',{products,category})
}else{
    const products=await Product.find({})
res.render('index',{products,category:'All'})
}
})

app.get('/products/new',(req,res)=>{
    res.render('new',{categories})
})

app.post('/products', async(req,res)=>{
    const newproduct=new Product(req.body);
    await newproduct.save();
    res.redirect('/products');
})

app.get('/products/:id',async (req,res)=>{
    const{id}=req.params;
    const product=await Product.findById(id)
    res.render('show',{product})
})
app.get('/products/:id/edit',async(req,res)=>{
    const{id}=req.params;
    const product=await Product.findById(id)
    res.render('edit',{product,categories});
})

app.put('/products/:id',async(req,res)=>{
    const{id}=req.params;
    const product=await Product.findByIdAndUpdate(id,req.body,{runValidators:true, new:true })
    res.redirect(`${product._id}`);
})

app.delete('/products/:id',async(req,res)=>{
    const{id}=req.params;
    const deletedproduct=await Product.findByIdAndDelete(id);
    res.redirect('/products');
})
app.get('*',(req,res)=>{
    res.send('error!')
})
app.listen(2021,()=>{
    console.log("listening on port 2021!");
})