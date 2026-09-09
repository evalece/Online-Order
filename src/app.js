const express = require("express")
const orderRoutes = require("./routes/order")

const app =express()

app.use(express.json())

app.get("/health", (req,res)=>{
    res.json({status:"ok"})
})

app.use("/orders", orderRoutes)

app.use((err, req , res, next) =>{
    console.error(err)
    return res.status(500).json({
        error: "internal server error"
    })
})

module.exports  = app 