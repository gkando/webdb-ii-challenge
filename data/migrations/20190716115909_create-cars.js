
exports.up = function(knex) {

  return knex.schema.createTable('cars', tbl => {
    tbl.increments();
    tbl.text('VIN', 128).unique().notNullable();
    tbl.text('make').unique().notNullable();
    tbl.text('model').unique().notNullable();
    tbl.integer('year').notNullable();
    tbl.integer('mileage').notNullable();
    tbl.text('transmission');
    tbl.text('title_status');
  });
};

exports.down = function(knex) {
return knex.schema.dropTableIfExists('cars');
};
