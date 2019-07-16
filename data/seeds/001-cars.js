import seeder from 'knex-csv-seeder';
const carsData = require('./cars_data');

function makeVIN() {
  var length = 15
  var result           = '';
  var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  var charactersLength = characters.length;
  for ( var i = 0; i < length; i++ ) {
     result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('cars').del()
  .then(() => {
    let cars = [];
    carsData.forEach(car => {
      car.vin = makeVIN()
      car.mileage = Math.floor((Math.random() * 180000) + 1)
      cars.push(car);
    })
    .then(function () {
      // Inserts seed entries
      return knex('cars').insert([]);
    });
};
