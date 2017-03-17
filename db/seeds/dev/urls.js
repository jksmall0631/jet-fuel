exports.seed = function(knex, Promise) {
  return knex('urls').del()
  .then(() => {
    return Promise.all([
      knex('urls').insert({
        id: "HkrRLh2Ge",
        date: 37,
        url: "I hate mash potatoes",
        folder_id: 1,
        created_at: new Date
      }),
      knex('urls').insert({
        id: "asdfjkl",
        date: 34,
        url: "I love rap music",
        folder_id: 1,
        created_at: new Date
      }),
      knex('urls').insert({
        id: "qWeRtY",
        date: 3,
        url: "I hate game shows",
        folder_id: 2,
        created_at: new Date
      })
    ]);
  });
};
