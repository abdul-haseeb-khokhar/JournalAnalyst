const express = require('express');
require('dotenv').config();
const app = express();
const mongoose =require('mongoose');
const tradeRoutes= require('./routes/tradeRoutes');
const cors = require('cors')

app.use(express.json());
app.use(cors({
    origin: ["http://localhost:5173", "http://localhost:5002"],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials:true
}));

mongoose.connect(process.env.MONGO_URI)
.then(()=> console.log("Trade DB connected"))
.catch(err => console.log("MongoDB connection error: ",err));


app.get("/",(req, res) =>{
    res.send("Trade Service is running");
});

app.use('/api/trades', tradeRoutes);

const PORT = process.env.PORT || 5002;

module.exports = app;
if(require.main === module){
    app.listen(PORT, ()=>{
        console.log(`Server for trade-service is running on port ${PORT}`);
    });
}