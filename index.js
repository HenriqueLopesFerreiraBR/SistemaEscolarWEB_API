const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();
const mongoose = require("mongoose");

const port = process.env.PORT;

mongoose
    .connect(process.env.URL_DB)
    .then(console.log("Banco de dados conectado"))
    .catch((error) => {
        console.log(error);
    });

app.get("/", (req, res) => res.send("Hello World!"));
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
