const express = require("express");
const app = express();
const cors = require('cors');
const pool = require('./database');
const jwt = require('jsonwebtoken');

// Middleware
app.use(cors());
app.use(express.urlencoded({ extended: true }));
// This gives us access to the request.body object (data from from the client side)
app.use(express.json());

/* ROUTES */

// Create a user 
app.post("/users", async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const newUser = await pool.query(
            "INSERT INTO users (username, email, password) VALUES($1, $2, $3) RETURNING *",
            [username, email, password]
        );

        res.json(newUser.rows[0]);

    } catch (err) {
        console.error(err.message);
    }
});

// Get all cookbooks
app.get("/cookbooks", async (req, res) => {
    try {
        const allCookbooks = await pool.query(
            "SELECT * FROM cookbooks"); // Need to add, where username is equal the username that is logged in (can get it from the jwt payload)

        res.json(allCookbooks.rows);

    } catch (err) {
        console.error(err.message);
    }
});

// Get a single cookbook
app.get("/cookbooks/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const cookbook = await pool.query(
            "SELECT * FROM cookbooks WHERE cookbook_id = $1",
            [id]
        );

        res.json(cookbook.rows[0]);

    } catch (err) {
        console.error(err.message);
    }

});

// Create a cookbook
app.post("/cookbooks", async (req, res) => {
    try {
        const { cookbook_name, user_id, picture, description } = req.body;
        const newCookbook = await pool.query(
            "INSERT INTO cookbooks (cookbook_name, user_id, picture, description) VALUES($1, $2, $3, $4) RETURNING *",
            [cookbook_name, user_id, picture, description]
        );

        res.json(newCookbook.rows[0]);

    } catch (err) {
        console.error(err.message);
    }
});

// Update a cookbook's name, picture and description
// ** Right now, if you don't write anything in the req.body json content for "picture" for example, it will update the table with "null" as its value. You need to make sure the values are automatically inserted into the form when you want to edit, so that you only need to edit the things you want to edit; keeping the things you didnt want to edit to stay the same.
app.put("/cookbooks/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { cookbook_name, picture, description } = req.body;
        const updateCookbook = await pool.query(
            "UPDATE cookbooks SET cookbook_name = $1, picture = $2, description = $3 WHERE cookbook_id = $4",
            [cookbook_name, picture, description, id]
        );

        res.json(`Cookbook with id ${id} was updated!`);

    } catch (err) {
        console.error(err.message);
    }
});

// Delete a cookbook

// Get all recipies within a cookbook

// Create a recipe

// Update a recipe

// Delete a recipe



app.listen(3333, () => console.log("Listening on port 3333"));