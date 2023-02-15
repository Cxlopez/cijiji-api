// REQUIREMENTS
const express = require("express");
const morgan = require('morgan');

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

//SETUP AND MIDDLEWARES
const app = express();
const port = 8000;
app.use(morgan('dev')); //Requests logger
app.use(express.json()); //Allows requests that include json body

//ROUTES / ENDPOINTS
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
  
  const id = Math.floor(Math.random() * 10);

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


//LISTENER 
app.listen(port, () => {
  console.log(`app listening on port ${port}`);
})