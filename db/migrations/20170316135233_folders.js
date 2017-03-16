exports.up = function(knex, Promise) {
    return Promise.all([
        knex.schema.createTable('folders', function(table) {
            table.increments('id').primary();
            table.string('name');

            table.timestamps();
        }),

        knex.schema.createTable('urls', function(table){
            table.increments('id').primary();
            table.string('date');
            table.string('url');
            table.integer('folder_id')
                 .references('id')
                 .inTable('folders');

            table.timestamps();
        })
    ])
};

exports.down = function(knex, Promise) {
    return Promise.all([
      knex.schema.dropTable('urls'),
        knex.schema.dropTable('folders')
    ])
};
