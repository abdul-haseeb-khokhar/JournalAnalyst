require('dotenv').config();
const express = require('express');
const aiRoutes = require('./routes/aiRoutes');

const app = express();
app.use(express.json());

app.use('/api/ai',aiRoutes);

const PORT = process.env.PORT || 5003;

module.exports = app;
if (require.main === module){
    app.listen(PORT, ()=>{
        console.log(`AI service is running on Port ${PORT}`);
    });
}