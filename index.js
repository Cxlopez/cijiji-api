require('dotenv').config();
const app = require('./server');
const port = process.env.PORT || 8000;

// ----------------------- LISTENER
app.listen(port, () => console.log(`Example app listening on port ${port}`));