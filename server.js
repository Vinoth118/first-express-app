require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const verifyToken = require('./middlewares/verify-token');

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true });
const db = mongoose.connection;
db.on('error', (error) => console.error(error))
db.once('open', (error) => console.log('Conected to Database'))

app.use(express.json());
app.use(cookieParser());


app.get('/', (req, res) => {
    res.status(200).json({
        success: true,
        message: "Welcome, This is Homepage JSON"
    })
})

const productRoute = require('./routes/product');
const authRoute = require('./routes/authentication');

app.use('/auth', authRoute);
app.use('/product', verifyToken, productRoute);


app.listen(3001);