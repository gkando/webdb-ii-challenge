
exports.up = function(knex) {

  return knex.schema.createTable('cars', tbl => {
    tbl.increments();
    tbl.text('VIN', 128).notNullable();
    tbl.text('make');
    tbl.text('model');
    tbl.integer('year');
    tbl.integer('mileage');
    tbl.text('transmission');
    tbl.text('title_status');
  });
};

exports.down = function(knex) {
return knex.schema.dropTableIfExists('cars');
};
