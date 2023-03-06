// Class that we use from the pgAdmin database
const { Pool } = require('pg')

// Establishing a connection to my database
const pool = new Pool({
    user: 'postgres',
    password: 'nedvedvedned12',
    database: 'recipedb',
    host: 'localhost',
    port: '5432',
});

/* // Check if database was connected correctly
pool.query('SELECT NOW()', (err, res) => {
    if (err) {
      console.error('Error executing query', err);
    } else {
      console.log('Successfully connected to database');
    }
    pool.end();
  }); */

/*   // Get a user matched by email
  async function getUserByEmail(email) {
    const result = await database.query(`
    SELECT *
    FROM users
    WHERE email = $1
    `, [email])
    
    return result.rows[0];
  }
 */

 


  module.exports = pool;