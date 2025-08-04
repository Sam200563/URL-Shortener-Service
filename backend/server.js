const express = require('express');
require('dotenv').config()
const connectDB = require('./config/db')
const urlroutes = require('./routes/urls')
const indexroutes = require('./routes/index')
const authroutes = require('./routes/auth')
const linkroutes = require('./routes/links')
const paymentRoutes = require('./routes/paymentRoutes')
const errorHandler = require('./middleware/errorMiddleware')


connectDB();
const app = express()
app.use(express.json())
app.get('/',(req,res)=>{
    res.send('API is running with nodemon');
});
app.use('/api',urlroutes);
app.use('/',indexroutes);
app.use('/api/auth',authroutes);
app.use('/api/links',linkroutes);
app.use('/api/payment',paymentRoutes);
app.use(errorHandler)
const PORT = process.env.PORT || 5000;

app.listen(PORT,()=>console.log(`Server is alive and running on port ${PORT}`));