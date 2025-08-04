const Url = require('../models/Url');

const getmyLinks=async(req,res)=>{
    try {
        if(!req.user || !req.user.id){
            return res.status(400).json({success:false,message:'Not authorized '})
        }

        const links = await Url.find({user:req.user.id}).sort({date:-1});

        res.status(200).json({
            success:true,
            count:links.length,
            data:links});
    } catch (error) {
        console.error('Link error',error.message)
        res.status(500).json({success:false,message:'Internal server error'})
    }
}

module.exports = {getmyLinks,};