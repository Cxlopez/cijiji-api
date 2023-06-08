const { db } = require('../db');

const create = (userId, title, thumbnail_url, description, category, price) => {
  return db
    .query(
      'INSERT INTO ads (userId, title, thumbnail_url, description, category, price) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [userId, title, thumbnail_url, description, category, price]
    )
    .then(data => data.rows[0])
    .catch(err => console.error(err.stack));
};

const getAll = () => {
  return db
    .query('SELECT * FROM ads')
    .then(data => data.rows)
    .catch(err => console.error(err.stack));
};

const getById = id => {
  return db
    .query('SELECT * FROM ads WHERE id = $1', [id])
    .then(data => data.rows[0])
    .catch(err => console.error(err.stack));
};

const update = (title, thumbnail_url, description, category, price, id) => {
  return db
    .query(
      'UPDATE ads SET title = $1, thumbnail_url = $2, description = $3, category = $4, price = $5 WHERE id = $6 RETURNING *',
      [title, thumbnail_url, description, category, price, id]
    )
    .then(data => data.rows[0])
    .catch(err => console.error(err.stack));
};

const remove = id => {
  return db
    .query('DELETE FROM ads WHERE id = $1', [id])
    .then(data => data.rows)
    .catch(err => console.error(err.stack));
};

module.exports = { create, getAll, getById, update, remove };