const { AdsModel } = require('../models');

const create = (req, res) => {
  const { userId } = req.session;
  if (!userId) {
    return res.status(401).send({ message: 'User is not logged in' });
  }

  const { title, thumbnail_url, description, category, price } = req.body;
  if (!title || !thumbnail_url || !description || !category || !price) {
    return res
      .status(400)
      .send({ message: 'Please Provide All Information' });
  }

  AdsModel.create(userId, title, thumbnail_url, description, category, price)
    .then(ad => {
      res.status(201).send({ message: 'Created!', ad });
    })
    .catch(error => {
      console.log(error.message);
      res
        .status(500)
        .send({ message: 'Error creating ad', error: error.message });
    });
};

const getAll = (req, res) => {
  AdsModel.getAll()
    .then(ads => {
      if (ads.length === 0) {
        return res.status(200).send({ message: 'No ads available!' });
      }

      res.status(200).send({ message: 'List of all ads!', ads });
    })
    .catch(error => {
      console.log(error.message);
      res
        .status(500)
        .send({ message: 'Error reading ads', error: error.message });
    });
};

const getById = (req, res) => {
  const { id } = req.params;

  AdsModel.getById(id)
    .then(ad => {
      if (!ad) {
        return res.status(404).send({ message: 'ad not found!' });
      }

      res.status(200).send({ message: 'Here is your ad!', ad });
    })
    .catch(error => {
      console.log(error.message);
      res
        .status(500)
        .send({ message: 'Error reading ad', error: error.message });
    });
};

const update = (req, res) => {
  const { userId } = req.session;
  if (!userId) {
    return res.status(401).send({ message: 'User is not logged in' });
  }

  const { title, thumbnail_url, description, category, price } = req.body;
  if (!title || !thumbnail_url || !description || !category || !price) {
    return res
      .status(400)
      .send({ message: 'Provide all information to update a ad' });
  }

  const { id } = req.params;

  AdsModel.update(title, thumbnail_url, description, category, price, id)
    .then(ad => {
      if (!ad) {
        return res.status(404).send({ message: 'ad not found!' });
      }

      res.status(201).send({ message: 'Updated!', ad });
    })
    .catch(error => {
      console.log(error.message);
      res
        .status(500)
        .send({ message: 'Error updating ad', error: error.message });
    });
};

const remove = (req, res) => {
  const { userId } = req.session;
  if (!userId) {
    return res.status(401).send({ message: 'User is not logged in' });
  }

  const { id } = req.params;

  AdsModel.remove(id)
    .then(() => {
      res.status(204).send();
    })
    .catch(error => {
      console.log(error.message);
      res
        .status(500)
        .send({ message: 'Error deleting ad', error: error.message });
    });
};

module.exports = { create, getAll, getById, update, remove };