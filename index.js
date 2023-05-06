const express = require("express");
const bodyParser = require("body-parser")
require("dotenv").config();

const router = require("./router");

const app = express();

app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json())

app.use(router);


const port = 8000;
app.listen(port, () => {
    console.log("=================================")
    console.log("ravel studions  is up and running");
    console.log(`the app is running on port: ${port}`);
    console.log("=================================")
})