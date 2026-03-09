require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes');

const app = express();
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
    .then(() =>console.log ('Connected to MongoDB'))
    .catch(err => console.log('MongoDb connection error:', err));

app.use('/api/users', userRoutes);

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`User service running on port ${PORT}`));