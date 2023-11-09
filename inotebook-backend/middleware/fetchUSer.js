const jwt = require("jsonwebtoken");

const fetchUser = (req,res,next)=>{
    
    // Get the user from the jwt token
    
    const token =  req.header('auth-token');

    try {
        const data = jwt.verify(token,process.env.JWT_SECRET);
        req.user = data.user;
    } catch (error) {
        res.status(401).send({error: "please authenticate using a valid token"});
    }

    next()
}

module.exports = fetchUser;