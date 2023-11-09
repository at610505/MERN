const express = require("express");
const {body , validationResult} = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require('dotenv').config();
const User = require("../models/user");
const fetchUser = require("../middleware/fetchUSer")

const router = express.Router();

const validator = () =>{
    return [
        body('name').isLength({min:3}).withMessage("Please enter a valid name"),
        body('email').isEmail().withMessage("Please enter a valid email")
    ]
}

//Route 1 : Create User; If error , return Bad Request and the errors
router.post('/createUser',validator(), async(req,res)=>{

    const errors = validationResult(req);
    let success = false;
    if (!errors.isEmpty()) {
      return res.status(400).json({success, errors: errors.array() });
    }

    // Check whether user exists with email or not
    try {
        let user = await User.findOne({email: req.body.email});
        if(user){
            return res.status(400).json({success,error:"Already a user exists with this email"})
        }

        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.password,salt);
    
        const createdUser = await User.create(
        {
            name: req.body.name,
            email: req.body.email,
            password: secPass
        });

        const data = {
            user:{
                id: createdUser.id
            }
        }
        
        const authToken = jwt.sign(data,process.env.JWT_SECRET);
        success=true;
        res.json({success,authToken});

    } catch (error) {
        console.error(error.message);

        res.status(500).json({success,error:"Internal Server Error"});
    }

})

//Route2: login a user Authenticate a User api/auth/login , no login required
router.post('/login',[
    body("email").isEmail().withMessage("Please enter a valid email"),
    body("password").isLength({min : 5}).withMessage("Password should be atleast 5 characters")
],async (req,res)=>{

    let success = false;
    try {
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
        
    }

    const {email,password} = req.body;
    

        let user = await User.findOne({email});
        if(!user){
            return res.status(400).json({success,error:"Please try to login with correct credentials"});
        }

        const passwordCompare = await bcrypt.compare(password, user.password);

        if(!passwordCompare){

            return res.status(400).json({success, error:"Please try to login with correct credentials"});
        }

        const data = {
            user:{
                id:user.id
            }
        }

        const authToken = jwt.sign(data,process.env.JWT_SECRET);
        success = true;

        res.json({success,authToken});

    } catch (error) {

        console.error(error.message);
        res.status(500).json({success,error:"Internal Server Error"});
    }

})

// Route 3: Get logged In user details using POST: "/api/auth/getuser"

router.post("/getuser",fetchUser ,async(req,res)=>{
    try {

        let userId= req.user.id;
        console.log(userId);
    
        let user = await User.findById(userId).select("-password");
        res.send(user);
    
    } catch (error) {
        console.error(error.message);
        res.status(500).json({success,error:"Internal Server Error"});
    }
})




module.exports = router;