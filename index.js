const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });

const userRouter = require('./routes/user');
const { logReqRes } = require('./middlewares')
const { connectMongoDb } = require('./connection')

const app = express();
const PORT = 3000;


//Connection
connectMongoDb(process.env.DB_URL)
.then(() => console.log('MongoDB connected!'));

app.set('view engine', 'ejs');
app.set('views', path.resolve('./views'));

// Middleware - Plugin
app.use(express.urlencoded({extended: false }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(logReqRes('log.txt'));

app.use("/worko", userRouter);


app.listen(PORT, console.log(`Server Started at Port: ${PORT}`)); 