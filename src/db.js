// SQL database connection pools
// reuse pool connections and relase once finish processing

const {Pool} = require("pg")
console.log("DB_HOST seen by Node:", process.env.DB_HOST)
console.log("DB_PORT seen by Node:", process.env.DB_PORT)
const pool = new Pool ({
    host: process.env.DB_HOST || "localhost",
    port: Number(process.env.DB_PORT) || 5432,
    user: process.env.DB_USER || "evaliu",
    password: "0",
    database: process.env.DB_NAME || "order_backend"
})


module.exports = pool