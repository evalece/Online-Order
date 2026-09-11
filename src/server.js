require("dotenv").config()

const app = require("./app")
const pool = require("./db")
const {
    connectProducer,
    disconnectProducer
} = require("./kafka/producer")

const PORT = Number(process.env.PORT) || 3000

let server

async function start() {
    await connectProducer()

    server = app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`)
    })
}

async function shutdown(signal) {
    console.log(`${signal} received. Shutting down.`)

    server.close(async () => {
        console.log("HTTP server closed")

        await disconnectProducer()
        console.log("Kafka producer disconnected")

        await pool.end()
        console.log("DB pool closed")

        process.exit(0)
    })
}

process.on("SIGINT", () => shutdown("SIGINT"))
process.on("SIGTERM", () => shutdown("SIGTERM"))

start().catch((err) => {
    console.error("Failed to start application:", err)
    process.exit(1)
})