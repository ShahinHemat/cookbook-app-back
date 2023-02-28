const express = require("express");
const app = express();
const cors = require('cors');

app.use(express.urlencoded({
 extended: true
}));
app.use(cors());
app.use(express.json());
app.listen(3333, () => console.log("Listening on port 3333"));