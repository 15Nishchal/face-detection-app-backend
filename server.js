const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');
const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const db = knex({
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      //port : 3001,
      user : 'postgres',
      password : 'test',
      database : 'smart_brain'
    }
  });

  //the below query returns a promise
//   db.select('*').from('users').then(data => {
//     console.log(data);
//   });

const app = express();
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());


app.put('/image', (req, res) => {image.handleImage(req, res, db)});

// --> '/profile/id' route that will render the user info on matching with their id
app.get('/profile/:id', (req, res) => {profile.handleProfileGet(req, res, db)});

//this is called dependency injection.
//we are injecting whatever dependencies this handleRegister function needs
app.post('/register', (req, res) => {register.handleRegister(req, res, db, bcrypt)})

//route route that displays all the users we have in our database
app.get('/', (req, res) => {
    res.send('it is working')
});

//creating signin route which will be a POST request
app.post('/signin', (req, res) => {signin.handleSignin(req, res, db, bcrypt)});

app.listen(process.env.PORT || 3000, () => {
    console.log(`app is running on port ${process.env.PORT}`);
});
