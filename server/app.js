const express = require("express");
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');

// Nodemailer
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const nodemailer = require('nodemailer');
const path = require('path');
//


dotenv.config({ path: './config.env' });
require('./db/conn');
// const User = require('./model/userSchema');

app.use(express.json());
app.use(cookieParser());

// we link the router files to make our route easy
app.use(require('./router/auth'));

const PORT = process.env.PORT;

// Middleware
// const middleware = (req, res, next) => {
//     console.log(`Hello my middleware`);
//     next();
// };
// middleware();

// app.get("/", (req, res) => {
//     res.send(`Hello World from the server app.js`);
// });
// app.get('/about', middleware, (req, res) => {
//     console.log(`Hello my About`);
//     res.send(`Hello from the About Us Page`);
// });
// app.get('/contact', (req, res) => {
//     // res.cookie("Test","Adite");
//     res.send(`Hello from the Contact Us Page`);
// });

 
// Static Folder
app.use('/public',express.static(path.join(__dirname,'src')))

//
app.get('/sendmail',(req,res)=>{
    res.sendFile(__dirname + "/src/components/SendMail.js");
});

app.post('/sendmail',(req,res)=>{
    console.log(req.body);

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user:'aditesingh59@gmail.com',
            pass:'pagloo123'
        }
    })
    const mailOptions = {
        from:'aditesingh59@gmail.com',
        to:req.body.email,
        subject:`Message from ${req.body.name}: ${req.body.subject}`,
        text:req.body.message
    }
    transporter.sendMail(mailOptions,(error,info)=>{
        if(error){
            console.log(error);
            res.send('error');
        }
        else{
            console.log('Email sent'+info.response);
            res.send('success');
        }
    });
});
//


app.get('/signin', (req, res) => {
    res.send(`Hello from the Login Page`);
});
app.get('/signup', (req, res) => {
    res.send(`Hello from the Registration Page`);
})
app.listen(PORT, () => {
    console.log(`server is running at port no ${PORT}.`);
})