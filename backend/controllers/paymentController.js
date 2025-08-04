const Razorpay = require('razorpay');

const razorpay= new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});

const createOrder = async(req,res)=>{
    try {
        const {amount} = req.body;

        const options={
            amount:amount*100,
            currency:'INR',
            receipt:`receipt_order_${Math.random()*1000}`
        }

        const order = await razorpay.orders.create(options)
        res.status(200).json({success:true,message:'Order created succesful',order})
    } catch (error) {
        console.error('Create Razorpay order error:',error);
        res.status(500).json({success:false,message:'Internal server error:Payment order creation failed'})
    }
};

module.exports={createOrder};