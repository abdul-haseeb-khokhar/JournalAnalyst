require('dotenv').config();
const express = require('express');
const aiRoutes = require('./routes/aiRoutes');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors({
    origin:["https://journal-analyst-five.vercel.app/", "https://journal-analyst-ai-service.vercel.app"],
    methods: ["POST","GET", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials:true
}));
app.use('/api/ai',aiRoutes);
app.get('/',(req, res) =>{
    res.send("AI service is running")
});
const PORT = process.env.PORT || 5003;

module.exports = app;
if (require.main === module){
    app.listen(PORT, ()=>{
        console.log(`AI service is running on Port ${PORT}`);
    });
}