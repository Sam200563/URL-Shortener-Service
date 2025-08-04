const errorHandler =(err,req,res,next)=>{
    let statuscode = err.statuscode || res.statuscode || 500;

    if(err.name==='CastError' && err.kind === 'ObjectId'){
        statuscode=404;
        err.message = 'Resource not found'
    }

    console.error(err.stack);

    res.status(statuscode).json({
        success:false,
        error:err.message,
        stack: process.env.Node_env === 'Production' ? '🥞': err.stack,
    })
}

module.exports = errorHandler