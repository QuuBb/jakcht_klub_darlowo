const { Pool } = require('pg');

// Konfiguracja połączenia
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'database',
  password: '123456',
  port: 5432,
});

// Test połączenia
pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error('Błąd połączenia z bazą danych:', err.stack);
  } else {
    console.log('Połączenie z bazą danych zostało ustanowione.');
  }
});

module.exports = pool;
