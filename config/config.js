require('dotenv').config();

module.exports = {
    development: {
        username: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_NAME,
        host: process.env.DB_HOST,
        port: process.env.DB_PORT || 3306,
        dialect: process.env.DB_DIALECT || 'mysql',
        dialectOptions: {
            ssl: {
                rejectUnauthorized: false, // kalau pakai cloud MySQL/TiDB yang pakai SSL
            },
        },
        logging: false,
    },
    production: {
        username: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_NAME,
        host: process.env.DB_HOST,
        port: process.env.DB_PORT || 3306,
        dialect: process.env.DB_DIALECT || 'mysql',
        dialectOptions: {
            ssl: {
                rejectUnauthorized: false,
            },
        },
        logging: false,
    },
};
