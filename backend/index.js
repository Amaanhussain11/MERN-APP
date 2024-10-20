const express = require('express');
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
const User = require('./usermodel')
const app = express();
const PORT = 5000;

app.use(express.json())


mongoose.connect('mongodb://localhost:27017/mern-app').then(()=>{
    console.log("App is connected to Mongodb")
}).catch((err)=>{
    console.log(err)
});


app.get('/', (req, res) => {
    res.send("Hello, MERN STACK");
})

app.get('/api/users',async(req,res)=>{
    try{
        const users = await User.find();

        res.status(200).json({
            users
        })
    }
    catch(err){
        res.status(500).json({
            messege:"Internal Server Error",
            error:err
        })
        
    }
})

app.post('/api/users',async(req,res)=>{
    try{
        const {name,email,age} = req.body;
        const newuser = new User({name,email,age});
        await newuser.save();
        res.status(201).json({
            messege:"User Created",
            data:newuser
        })
    }
    catch(err){
        console.log(err)
        res.status(500).send('Internal Server Error')
    }
})


app.listen(PORT, () => {
    console.log(`Server is working on http://localhost:${PORT}`);
})
