require("dotenv").config()
const app = require("./app")
const pool = require("./db")
const PORT = Number(process.env.PORT) || 3000


const server = app.listen(PORT, ()=> {
    console.log(`Serever running on port ${PORT}`)
})

async function shutdown (signal){
    console.log(`${signal} received. Shutting down.` )
    server.close(async ()=> {
        console.log("HTTP server closed")
        await pool.end()
        console.log("DB pool closed")

        process.exit(0)
    })

}
// gracefull shutdown on interruption or termination
process.on("SIGINT", ()=> shutdown("SIGINT")) 
process.on("SIGTERM", ()=> shutdown("SIGTERM"))