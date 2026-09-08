// SQL database connection pools
// reuse pool connections and relase once finish processing

const {Pool} = require("pg")

const pool = new Pool ({
    host: "localhost",
    port: 5432,
    user: "evaliu",
   //password: "123",
    database: "order_backend"
})

pool.query("SELECT NOW()")
  .then((result) => {
    console.log("DB connected:", result.rows[0])
  })
  .catch((err) => {
    console.error("DB connection failed:", err)
  })
module.exports = pool