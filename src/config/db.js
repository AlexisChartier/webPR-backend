/**
 * Database configuration module.
 * 
 * This module sets up the configuration for connecting to a MySQL database using environment variables.
 * It reads SSL certificate from the file system and configures connection pooling.
 * 
 * Environment Variables:
 * - DB_NAME: Name of the database.
 * - DB_USERNAME: Username for the database.
 * - DB_PASSWORD: Password for the database.
 * - DB_HOST: Hostname of the database server.
 * 
 * SSL:
 * - The SSL certificate is read from '../ssl/mysql-ca.pem'.
 * 
 * Connection Pooling:
 * - max: Maximum number of connections in the pool (default: 10).
 * - min: Minimum number of connections in the pool (default: 0).
 * - acquire: Maximum time (in ms) that pool will try to get connection before throwing error (default: 30000).
 * - idle: Maximum time (in ms) that a connection can be idle before being released (default: 10000).
 */

require('dotenv').config();
const fs = require('fs');
const { connect } = require('http2');
const mysql = require('mysql2');
const path = require('path');

const ca = path.resolve(__dirname, '../ssl/mysql-ca.pem');

module.exports = {
    DB : process.env.DB_NAME,
    USER : process.env.DB_USERNAME,
    PASSWORD : process.env.DB_PASSWORD,
    CONFIG : {
        host: process.env.DB_HOST,
        dialect: 'mysql',
        dialectModule: mysql,
        dialectOptions: {
            ssl: {
                ca: fs.readFileSync(ca).toString()
            },
            connectTimeout: 20000
        },
        pool: {
            max: 10,
            min: 0,
            acquire: 30000,
            idle: 10000
        }
    }
}
