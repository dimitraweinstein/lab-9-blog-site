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

    static async updateById(id, { firstName, lastName, email, userName, pin }) {
      const existingUser = await User.getById(id);
      const newFristName = firstName ?? existingUser.firstName;
      const newLastName = lastName ?? existingUser.lastName;
      const newEmail = email ?? existingUser.email;
      const newUserName = userName ?? existingUser.userName;
      const newPin = pin ?? existingUser.pin;

      const { rows } = await pool.query(
        `UPDATE users
        SET first_name=$1, last_name=$2, email=$3, user_name=$4, pin=$5
        RETURNING *`,
        [newFristName, newLastName, newEmail, newUserName, newPin]
      );
      return new User(rows[0]);
    }
};


