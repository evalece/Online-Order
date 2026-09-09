require("dotenv").config()
const express =  require("express")
const orderRoutes = require("./routes/order")
const app = express()
const PORT = Number(process.env.PORT) || 3000
const pool = require("./db")
app.use(express.json())

app.get("/health", (req, res)=>{

    res.json({status:"ok"})
})

app.use("/orders",orderRoutes)

//global error 
app.use((err, req, res, next)=>{
    console.error(err)
    return res.status(500).json({
        error:"Internal server error"
    })
})

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