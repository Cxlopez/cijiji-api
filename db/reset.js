require('dotenv').config();
const { db } = require('./index');

const createSchema = require('./schemas/createSchema');
const fruitsSchema = require('./schemas/fruitsSchema');

const usersSeeds = require('./seeds/usersSeeds');
const fruitsSeeds = require('./seeds/fruitsSeeds');
const adsSeeds = require('./seeds/adsSeeds');

db.connect();

const promises = [
  db.query(createSchema),
  db.query(fruitsSchema),
  db.query(usersSeeds),
  db.query(fruitsSeeds),
  db.query(adsSeeds)
];

Promise.all(promises)
  .then(() => console.log('DB reset completed!'))
  .then(() => db.end())
  .catch(err => console.log('Failed to reset', err));