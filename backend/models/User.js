const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,'Please provide name']
    },

    email:{
        type:String,
        required:[true,'Please provide email'],
        unique:true,
        match:[
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            'Please provide a valid email address'
        ],
    },
    password:{
        type:String,
        required:[true,'Please provide password'],
        minlength:6,
        select:false,
    },
    plan:{
        type:String,
        enum:['Free','Bronze','Sliver','Gold'],
        default:'Free',
    },
    planExpiresAt:{
        type:Date,
        default:null,
    },
    totalshortLinks:{
        type:Number,
        default:0,
    }
},
{
    timestamps:true
});
module.exports = mongoose.model('user',userSchema)
