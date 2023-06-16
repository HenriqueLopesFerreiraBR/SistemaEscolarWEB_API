const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();
const mongoose = require("mongoose");


const authRouter = require('./src/router/authRouter')
const userRouter = require('./src/router/userRouter')

const port = process.env.PORT;


//app.use(express.bodyParser());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

mongoose
    .connect(process.env.URL_DB)
    .then(console.log("Banco de dados conectado"))
    .catch((error) => {
        console.log(error);
    });

app.use('/api/auth',authRouter)
app.use('/api/user',userRouter)

app.get("/", (req, res) => res.send("Hello World!"));
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
