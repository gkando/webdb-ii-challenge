const carsData = require('../cars_data');

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
  let cars = [];
  carsData.forEach(car => {
    car.vin = makeVIN()
    car.mileage = Math.floor((Math.random() * 180000) + 1)
    cars.push(car);
  }) 

  return knex('cars').truncate()

    .then(function () {
      console.log(cars.length)
        return knex('cars').insert(cars);
      })



};
