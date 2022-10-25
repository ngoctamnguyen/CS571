const express = require('express');
const { ObjectId } = require('mongodb');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const database = require('./db');

const PRIVATE_KEY = "Good morning";

const server = express();

database.connectDB().then(() => {
    server.listen(3000, () => console.log('Listening on port 3000...'));
}).catch(err => console.error(err.message));

server.use(express.json());
server.use(cors());

//login - authentication - authorization
//NOTES...: signin and Signup must be put before authorization

server.post('/users/login', async (req, res) => {

    try {
        const email = req.body.email;
        const password = req.body.password;
        if (email === "" && password === "") {
            res.status(401).send("Input email password")
        } else {
            const response = await database.login(email);
            if (bcrypt.compareSync(password, response.password)) {
                const Token = jwt.sign(
                    { email },
                    PRIVATE_KEY,
                    { expiresIn: 24 * 60 * 60 }//60 seconds * 60 * 24 = 1 day
                )
                res.status(200).json(Token);
            } else {
                res.status(400).send("Invalid email or password")
            }
        }
    } catch (error) {
        res.send(error);
    }
})

server.post('/users/add', async (req, res) => {
    try {
        const user = req.body;
        user.password = bcrypt.hashSync(user.password, 8);
        const response = await database.addUser(user);
        res.json(response);
    } catch (error) {
        res.send(error);
    }
})

//middleware
function authorize(req, res, next) {
    console.log(req.headers.authorization);
    if (req.headers.authorization) {
        const token = req.headers.authorization.split(" ")[1];
        jwt.verify(token, PRIVATE_KEY, (err, user) => {
            if (err) {
                res.send('Wrong token');
                return;
            }
            req.user = user;
            next();
        })
    } else {
        res.send('Token does not exist')
    }
}

server.use(authorize);

//for user profile================================================

server.get('/users', async (req, res) => {
    try {
        const { email } = req.user;
        const response = await database.getUser(email);
        res.json(response);
    } catch (error) {
        res.send(error);
    }
})

server.put('/users/edit', async (req, res) => {
    try {
        const user = req.body;
        const { email } = req.user;
        const password = bcrypt.hashSync(user.password, 8);
        const fullname = user.fullname;
        const phone = user.phone;
        const address = user.address;
        const response = await database.editUser(email, password, fullname, phone, address);
        res.json(response);
    } catch (error) {
        res.send(error);
    }
})

//for food CRUD====================================

//get list of foods
server.get('/foods', async (req, res) => {
    try {
        const { email } = req.user; //get email from authorization;
        const response = await database.getFoodByUser(email);
        res.json(response.foods);
    } catch (error) {
        res.send(error)
    }
})

//add new food
server.post('/foods/add', async (req, res) => {
    try {
        const { email } = req.user; //get email from authorization;
        const food = req.body;
        food._id = ObjectId();
        const response = await database.addFood(email, food);
        res.status(200).json(response);
    } catch (error) {
        res.send(error);
    }
})

//edit food
server.put('/foods/edit/:food_id', async (req, res) => {
    try {
        const { email } = req.user; //get email from authorization;
        const foodId = ObjectId(req.params.food_id);
        const foodname = req.body.foodname;
        const origine = req.body.origine;
        const price = req.body.price;
        const date = req.body.date;
        const image = req.body.image;
        const result = await database.editFood(email, foodId, foodname, origine, price, date, image);
        res.status(200).json(result);
    } catch (error) {
        res.send(error);
    }
})

//soft delete food
server.delete('/foods/delete/:food_id', async (req, res) => {
    try {
        const { email } = req.user; //get email from authorization;
        const foodId = ObjectId(req.params.food_id);
        const result = await database.deleteFood(email, foodId);
        res.status(200).json(result);
    } catch (error) {
        res.send(error);
    }
})

//for Notes=======================================

//add a note
server.post('/notes/add', async (req, res) => {
    try {
        const { email } = req.user;
        const note = req.body;
        note._id = ObjectId();
        const response = database.addNote(email, note);
        res.status(200).json(response);
    } catch (error) {
        res(error);
    }
})

server.get('/notes', async (req, res) => {
    try {
        const { email } = req.user;
        const response = await database.getAllNotes(email);
        res.status(200).json(response.notes);
    } catch (error) {
        res.status(500).json(new Response(true, error.message, null));
    }
})

server.delete('/notes/delete/:id', async (req, res) => {
    try {
        const { email } = req.user;
        const noteId = ObjectId(req.params.id);
        const response = database.deleteNoteById(email, noteId);
        res.status(200).send(response)
    } catch (error) {
        res.status(500).json(new Response(true, error.message, null));
    }
})