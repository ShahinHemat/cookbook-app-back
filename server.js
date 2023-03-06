const express = require("express");
const app = express();
const cors = require('cors');
const jwt = require('jsonwebtoken');

// Middleware
app.use(cors());
app.use(express.urlencoded({ extended: true }));
// This gives us access to the request.body object (data from from the client side)
app.use(express.json());


app.listen(3333, () => console.log("Listening on port 3333"));