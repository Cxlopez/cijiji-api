// REQUIREMENTS
const express = require("express");
const morgan = require('morgan');

//SETUP AND MIDDLEWARES
const app = express();
const port = 8000;

app.use(morgan('dev'));

//ROUTES / ENDPOINTS
app.get ('/', (req, res) => {
  res.send("Hello world!");
})

//LISTENER 
app.listen(port, () => {
  console.log(`app listening on port ${port}`);
})