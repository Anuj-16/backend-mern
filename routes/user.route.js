const {Router} = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config()

const {UserModel} = require("../models/user.model")

const userControl = Router();

userControl.post("/signup", async (req, res) => {
    const {email, password} = req.body;
    bcrypt.hash(password, 5, async function(err, hash) {
        if(err){
            res.send("someting went wrong, try again")
        }
        const user = new UserModel({
            email,
            password: hash,
            
        })

        try {
            await user.save()
            res.send("Register Successfull")
        } catch (error) {
            console.log(error)
            console.log("wrong someting ")
        }

    });
})

userControl.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
    
        const user = await UserModel.findOne({ email });
    
       
        if (!user || !(await bcrypt.compare(password, user.password))) {
          return res.status(401).json({ message: 'Invalid credentials' });
        }
    
        const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY);
    
        res.status(200).json({ token });
      } catch (error) {
        res.status(500).json({ message: 'Something Server Error' });
      }
})

module.exports = {userControl}