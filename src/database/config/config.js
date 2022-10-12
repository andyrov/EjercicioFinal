require('dotenv').config()


module.exports = {
  "development": {
    "username": "root",
    "password": process.env.SECRET_KEY,
    "database": "movies_db",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "database-test",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "production": {
    "username": "root",
    "password": null,
    "database": "database-production",
    "host": "127.0.0.1",
    "dialect": "mysql"
  }
}
