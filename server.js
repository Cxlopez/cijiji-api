// REQUIREMENTS
const express = require("express");
const morgan = require('morgan');

//SETUP AND MIDDLEWARES
const app = express();
const port = 8000;
app.use(morgan('dev')); //Requests logger
app.use(express.json()); //Allows requests that include json body

//ROUTES / ENDPOINTS
app.get ('/', (req, res) => {
  res.send("Hello world!");
})

//CRUD Operations
//CREATE - POST
app.post('/api/fruits', (req, res) => {
  console.log(req.body);
  res.status(201).send({message: 'Created!', fruit: req.body})
})
//READ - GET

//UPDATE - PUT

//DELETE - DELETE

//LISTENER 
app.listen(port, () => {
  console.log(`app listening on port ${port}`);
})