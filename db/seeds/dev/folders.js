exports.seed = function(knex, Promise) {
  return knex('folders').del()
  .then(() => {
    return Promise.all([
      knex('folders').insert({
        id: 5,
        name: 'Shua',
        created_at: new Date
      }),
      knex('folders').insert({
        id: 7,
        name: 'Laurn',
        created_at: new Date
      })
    ]);
  });
};
