require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes');
const cors = require('cors')

const dns = require('node:dns').promises
dns.setServers(['1.1.1.1','1.0.0.1'])


const app = express();
app.use(express.json());
app.use(cors({
    origin: ["https://journal-analyst-five.vercel.app", "http://localhost:5173"],
    methods:["GET","POST","PUT","DELETE","OPTIONS"],
    allowedHeaders:["Content-Type","Authorization"],
    credentials:true
}));

mongoose.connect(process.env.MONGO_URI)
    .then(() =>console.log ('Connected to MongoDB'))
    .catch(err => console.log('MongoDb connection error:', err));

app.use('/api/users', userRoutes);
app.get('/', (req, res) => {
    res.send('User service is running');
});
const PORT = process.env.PORT || 5001;

module.exports = app;
if(require.main === module){
    app.listen(PORT, () => console.log(`User service running on port ${PORT}`));
}