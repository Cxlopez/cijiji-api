// REQUIREMENTS
const express = require("express");
const morgan = require('morgan');
const helmet = require('helmet');
const bcrypt = require("bcryptjs");


//DATABASE
const fruitsDB = {
  '1a': {
    name: 'mango',
    color: 'yellow',
    image: "🥭"
  },

  '2b': {
    name: 'blueberry',
    color: 'blue',
    image: "🫐"
  }
}

const usersDB = [
  {
    id: 'ar5',
    email: 'user1@email.com',
    password: '123'
  }
];

//SETUP AND MIDDLEWARES
const app = express();
const port = 8000;

app.use(helmet()); //Includes security headers (owasp)
app.use(morgan('dev')); //Middleware that logs all requests
app.use(express.json()); //Allows requests that include json body


// ---------------------------------------------- ROUTES / ENDPOINTS
app.get ('/', (req, res) => {
  res.send("Hello world!");
})

app.get('/home', (req, res) => {
  res.status(200).send({ message: 'welcome home'});
})

//CRUD Operations
//CREATE - POST
app.post('/api/fruits', (req, res) => {
  const {name, color, image} = req.body;
  if(!name || !color || !image) {
    return res.status(400).send({ message: 'provide name, color, image to create a fruit' });
  }
  
  let id = Math.random()
  .toString(36)
  .substr(2, 3);

  fruitsDB[id] = {
    name,
    color,
    image
  }

  res.status(201).send({message: 'Created!', fruit: req.body})
})


//READ - GET
//READ ALL
app.get('/api/fruits', (req, res) => {
  res.status(200).send({ message: 'List of all fruits', fruits: fruitsDB})
})

//READ ONE
app.get('/api/fruits/:id', (req, res) => {
  const { id } = req.params
  const fruit = fruitsDB[id];
  if (!fruit) {
    return res.status(404).send({ message: 'Sorry fruit not found' });
  }

  res.status(200).send({ message: 'Here is you fruit', fruits: fruitsDB[id]});
})


//UPDATE - PUT
app.put('/api/fruits/:id', (req, res) => {
  const {name, color, image} = req.body;
  if(!name || !color || !image) {
    return res.status(400).send({ message: 'provide name, color, image to create a fruit' });
  }
  
  const { id } = req.params;

  fruitsDB[id] = {
    name,
    color,
    image
  }

  res.status(201).send({message: 'Updated!', fruit: req.body})
})


//DELETE - DELETE
app.delete('/api/fruits/:id', (req, res) => {
  const { id } = req.params;
  delete fruitsDB[id];
  res.status(204).send();
});

//Authentication routes - (register, login, logout)
app.post('/api/auth/register', (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).send({ message: 'please provide an email and password' })
  }

  let id = Math.random()
  .toString(36)
  .substr(2, 3);

  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(password, salt);

  usersDB[id] = {
    id,
    email,
    password: hashedPassword
  }

  res.status(201).send({ message: 'User created!', user: usersDB[id] });

});

//LISTENER 
app.listen(port, () => {
  console.log(`app listening on port ${port}`);
})