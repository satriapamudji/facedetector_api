require('dotenv').config();
const express = require("express");
const cors = require("cors");
const knex = require('knex');
var bcrypt = require('bcryptjs');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');
const PORT = process.env.PORT

const db = knex({
  client: process.env.CLIENT,
  connection: {
    host : process.env.HOST,
    port : process.env.DB_PORT,
    user : process.env.USER,
    password : process.env.PASSWORD,
    database : process.env.DATABASE
  }
});

const app = express();
app.use(express.json());
app.use(cors());

app.post("/signin", (req, res) => { signin.handleSignin(req, res, db, bcrypt) });

app.post("/register", (req, res) => { register.handleRegister(req, res, db, bcrypt) });

app.get("/profile/:id", (req, res) => { profile.handleProfile(req, res, db) });

app.put("/image", (req, res) => { image.handleImage(req, res, db) });

app.listen(PORT, () => {
  console.log("Backend is running");
});
