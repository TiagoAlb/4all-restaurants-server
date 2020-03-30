
exports.up = function (knex) {
    return knex.schema.createTable('dish', function (table) {
        table.increments();
        table.string('name');
        table.decimal('price').notNullable();
        table.string('description', 200);
        table.integer('placeId').notNullable();
        table.foreign('placeId').references('id').inTable('place');
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable('dish');
};