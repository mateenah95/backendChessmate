
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');

const mongoose = require('mongoose');
const User = require('./User');

// const dbCon = require('./database');

const PUBLIC_PATH = path.join(path.dirname(__filename), 'public');
const PORT = process.env.PORT || 5000;

const app = express();

app.use(bodyParser.urlencoded({ extended: false }), bodyParser.json());

app.use(express.static(PUBLIC_PATH));

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Request-With, Content-Type, Accept, Authorization");
    next();
})

app.get('/', (req, res, next) => {
    res.send('<h1>Welcome To ChessMate API</h1>');
});

app.get('/signup', (req, res, next) => {
    res.send('<h1>Please use POST endpoint.</h1>')
});

app.post('/signup', (req, res, next) => {
    console.log(req.body);

    const username = req.body.username;
    const password = req.body.password;
    const displayPicture = req.body.displayPicture;

    const newUser = new User({
        username,
        password,
        displayPicture,
        rank: 0,
        score: 0,
        singleplayer: {
            wins: 0,
            loss: 0,
            draws: 0
        },
        multiplayer: {
            wins: 0,
            loss: 0,
            draws: 0
        },
    });

    newUser.save()
        .then(response => res.send({ message: 'Signup successfull. New user added.' }))
        .catch(err => {
            res.send({ message: 'Signup failed. Some error occured. Please try again later.' });
        })
});

app.get('/login', (req, res, next) => {
    res.send('<h1>Please use POST endpoint.</h1>')
});

app.post('/login', (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;

    let message = '';

    User.findOne({ username }, (err, theUser) => {
        if (err) {
            message = 'Some BACKEND error occured.';
        }
        else {
            if (theUser) {
                if (theUser.password === password) {
                    message = theUser;
                }
                else {
                    message = 'Invalid credentials';
                }
            }
            else {
                message = 'User not found';
            }
        }
        res.send({ message });
    });
});

app.get('/all', (req, res, next) => {
    User.find({}, (err, users) => {
        if (err) {
            res.send({ message: 'Some error occured' })
        }
        res.send(users);
    })
});

mongoose.connect('mongodb+srv://mateenah95:Shrooms2016@justnugs-m68ap.mongodb.net/users?retryWrites=true&w=majority')
    .then(() => {
        app.listen(PORT, () => console.log(`Chessmate API listening on port ${PORT}...`))
    })
    .catch(err => console.log(err))
