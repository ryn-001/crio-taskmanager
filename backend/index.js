require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const {connectDB} = require("./utility/connectDatabase");
const routes = require("./routes/routes.index")

let app = express();
const PORT = process.env.PORT;

app.use(cors({
    origin: [process.env.CORS_URI],
    credentials: true
}));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/api',routes);

connectDB(app,PORT);
