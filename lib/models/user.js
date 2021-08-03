const pool = require('../utils/pool.js');

module.exports = class User {
    id;
    firstName;
    lastName;
    email;
    userName;
    pin;

    constructor(row) {
      this.id = row.id;
      this.firstName = row.first_name;
      this.lastName = row.last_name;
      this.email = row.email;
      this.userName = row.user_name;
      this.pin = row.pin;
    }

    static async insert({ firstName, lastName, email, userName, pin  }) {
      const { rows } = await pool.query(
        `INSERT INTO users (first_name, last_name, email, user_name, pin) 
        VALUES($1, $2, $3, $4, $5) RETURNING * `,
        [firstName, lastName, email, userName, pin]
      );
      return new User(rows[0]);
    }

    static async getAll() {
      const { rows } = await pool.query(
        'SELECT * FROM users',
        []
      );
      return rows.map((row) => new User(row));
    }

    static async getById(id) {
      const { rows } = await pool.query(
        `SELECT * 
            FROM users
            WHERE id = $1`,
        [id]
      );
      return new User(rows[0]);
    }
};


