const db = require('../database/dbConfig');

module.exports = {
    add,
    findBy
}

  
function findBy(user) {
return db('users').where({ username: user });
}

async function add(user) {
const [id] = await db('users').insert(user);

return findById(id);
}

function findById(id) {
return db('users')
    .where({ id })
    .first();
}