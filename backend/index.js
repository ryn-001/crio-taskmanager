const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const {connectDB} = require("./utility/connectDatabase");
const routes = require("./routes/routes.index")

const PORT = process.env.PORT;

dotenv.config();
let app = express();

app.use(cors({
    origin: [process.env.CORS_URI],
    credentials: true
}));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// app.use('/api',routes);

connectDB(app);
