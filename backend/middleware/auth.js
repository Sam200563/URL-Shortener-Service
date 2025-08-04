const jwt = require('jsonwebtoken');

const auth = (req,res,next)=>{
    const token = req.header('Authorization');
    //const token = authheader.split(' ')[1]

    if(!token || !token.startsWith('Bearer ')){
        return next();
    }

    try {
        const decoded= jwt.verify(token.split(' ')[1],process.env.JWT);
        
        req.user = decoded.user;
        
        next();
    } catch (error) {
        console.error('Token error:',error);
        res.status(401).json({success:false,message:'Token invalid'})
    }
}

module.exports = auth