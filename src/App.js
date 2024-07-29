const express = require("express");
const cors = require("cors");
const bodyParser = require('body-parser');
const app = express();

app.use(express.json());
app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('Hello, World!');
});

const authRoutes=require("./Routes/authRoutes")
app.use("/auth",authRoutes);

const userRoute=require("./Routes/userRoute")
app.use("/api/users",userRoute);

module.exports = app;
