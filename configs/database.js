const {Client} = require("pg");

const client = new Client(process.env.DB_URL); // Configuring for PostgreSQL Database connection;

module.exports = client;

