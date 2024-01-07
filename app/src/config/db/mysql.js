"use strict";

const mysql = require("mysql2/promise");

const db = mysql.createPool({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_ROOT_PASSWORD,
    database: process.env.DATABASE_NAME,
    port: process.env.DATABASE_PORT,
    connectionLimit: 5,
});

module.exports = db;

// const testDatabaseConnection = async () => { // db test
//     const db = mysql.createPool({
//         host: process.env.DATABASE_HOST,
//         user: process.env.DATABASE_USERNAME,
//         password: process.env.DATABASE_ROOT_PASSWORD,
//         database: process.env.DATABASE_NAME,
//         port: process.env.DATABASE_PORT,
//         connectionLimit: 5,
//     });

//     try {
//         const connection = await db.getConnection();
//         console.log("Connected to the database!");

//         const [rows, fields] = await connection.execute("SHOW TABLES");

//         console.log("Tables in the database:");
//         rows.forEach((row) => {
//             console.log(row[`Tables_in_${process.env.DATABASE_NAME}`]);
//         });

//         connection.release();
//     } catch (error) {
//         console.error("Error connecting to the database:", error.message);
//     } finally {
//         await db.end();
//     }
// };

// testDatabaseConnection();