const express =  require("express")
const orderRoutes = require("./routes/order")
const app = express()
const PORT = 3000

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

app.listen(PORT, ()=> {
    console.log(`Serever running on port ${PORT}`)
})