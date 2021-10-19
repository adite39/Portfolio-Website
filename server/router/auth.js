const express = require("express");
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authenticate = require("../middleware/authenticate");

require('../db/conn');
const User = require("../model/userSchema");

router.get('/', (req, res) => {
    res.send(`Hello from the server router js`);
});

// Store data in database using promises
// router.post('/register', (req, res) => {

//     const { name, email, phone, work, password, cpassword } = req.body;

//     // console.log(req.body);
//     // console.log(name);
//     // console.log(email);
//     // res.json({message:req.body});
//     // res.send("mera register page");

//     // Validation
//     if (!name || !email || !phone || !work || !password || !cpassword) {
//         return res.status(422).json({ error: "Plz fill the fields properly" });
//     }
//     User.findOne({ email: email }).then((userExist) => {
//         if (userExist) {
//             return res.status(422).json({ error: "Email already exist" });
//         }
//         const user = new User({ name, email, phone, work, password, cpassword });

//         user.save().then(() => {
//             res.status(201).json({ message: "user registered successfully" });
//         }).catch((err) => {
//             res.status(500).json({ error: "Failed to register" });
//         })
//     }).catch((err => { console.log(err); }))

// })

// Store data in database using async await(Advanced JS)
router.post("/register", async (req, res) => {
    const { name, email, phone, work, password, cpassword } = req.body;

    // Validation -> User ne koi b data ko empty to nhi choda
    if (!name || !email || !phone || !work || !password || !cpassword) {
        return res.status(422).json({ error: "Plz fill the fields properly" });
    }

    try {
        const userExist = await User.findOne({ email: email });

        if (userExist) {
            return res.status(422).json({ error: "Email already exist" });
        }
        else if (password != cpassword) {
            return res.status(422).json({ error: "password are not matching" })
        }
        else {
            const user = new User({ name, email, phone, work, password, cpassword });
            // yaha pe user data save krne se phle hash kr denge password
            await user.save();
            res.status(201).json({ message: "user registered successfully" });
        }
        // const userRegsiter = await user.save();

        // if(userRegister){
        //     res.status(201).json({error:"user registered successfully."})
        // }
        // else{
        //     return res.status(422).json({ error: "Email already exist" });
        // }
    } catch (err) {
        console.log(err)
    }
});

// Login Route
router.post("/signin", async (req, res) => {
    // console.log(req.body);
    // res.json({message:"awesome"});
    try {
        let token;
        const { email, password } = req.body;
        if (!email, !password) {
            return res.status(400).json({ error: "Plz fill the data." })
        }
        const userLogin = await User.findOne({ email: email });

        // console.log(userLogin);

        // if (!userLogin) {
        //     res.status(400).json({ error: "user error" });
        // }
        // else {
        //     res.json({ message: "user signin successfully." });
        // }


        // Check Hash Password and Email & Implementing Login Functionality
        if (userLogin) {
            const isMatch = await bcrypt.compare(password, userLogin.password);

            token = await userLogin.generateAuthToken();
            console.log(token);

            // Store JWT token in cookie
            res.cookie("jwtoken", token, {
                expires: new Date(Date.now() + 2592000000),
                httpOnly: true
            });

            if (!isMatch) {
                res.status(400).json({ error: "Invalid Credentials pass" });
            }
            else {
                res.json({ message: "User Signin successfully" });
            }
        }
        else {
            res.status(400).json({ error: "Invalid Credentials" });
        }
    } catch (err) {
        console.log(err);
    }
})

// about us ka page
router.get('/about', authenticate, (req, res) => {
    res.send(req.rootUser);
});

// get user data for contact us and home page
router.get('/getdata', authenticate, (req, res) => {
    res.send(req.rootUser);
})

// contact us page
router.post('/contact', authenticate, async (req, res) => {
    try {
        const { name, email, phone, message } = req.body;

        if (!name || !email || !phone || !message) {
            console.log("error in contact form");
            return res.json({ error: "plz fill the contact form" })
        }
        const userContact = await User.findOne({ _id: req.userID });
        if (userContact) {
            const userMessage = await userContact.addMessage(name, email, phone, message);
            await userContact.save();
            res.status(201).json({ message: "user contact successfully" })
        }

    } catch (error) {
        console.log(error);
    }

});
// logout ka page
router.get('/logout', (req, res) => {
    console.log(`Hello my Logout Page`);
    res.clearCookie('jwtoken', { path: '/' });
    res.status(200).send('User Logout');
});
module.exports = router;