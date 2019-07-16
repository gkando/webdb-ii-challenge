const knex = require('knex');

const configOptions = require('../knexfile').development;

module.exports = knex(configOptions);
const db = knex(configOptions);

module.exports = {
  get,
  getById,
  insert,
  update,
  remove,
};

function get() {
  return db('cars');
}

function getById(id) {
  return db('accounts')
    .where({ id })
    .first();
}

function insert(car) {
  return db('cars')
    .insert(car)
    .then(ids => {
      return getById(ids[0]);
    });
}

function update(id, changes) {
  return db('cars')
    .where({ id })
    .update(changes);
}

function remove(carID) {
  return db('cars')
    .where('id', carID)
    .del();
}