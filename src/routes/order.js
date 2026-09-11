// check basic information except lists 

const express = require("express")
const router = express.Router()
const {publishOrderCreated} = require("../kafka/producer")

const {
    createOrder ,
    getOrder,
    getUserOrder
} = require ("../service/orderService")

router.get("/userOrder/:user_id", async (req, res, next)=>{
    try{
        const userID = req.params.user_id
        console.log(userID)
        const userOrder = await getUserOrder(userID)

        if (userOrder == null){
            return res.status(404).json({
                error: "User is not found"
            })
        }
        return res.status(200).json(userOrder)
    }catch(err){
        next(err)
    }
})

router.get("/:id", async(req,res,next)=> {
    try {
        const orderID = req.params.id
        const order =await getOrder(orderID)
        if (order == null){
            
            return res.status(404).json({
                error:"Order not found"
            })
                 
          
        }
         return res.status(200).json(order)
    } catch (err){
        next(err)
    }
   
})

router.post("/", async (req, res, next)=>{ // app.use("/orders",orderRoutes) 
    const order= req.body
    if ( order == null ){
        return res.status(400).json({
            error: "body is required"
        })
    }

    if ( order.userID == null){
        return res.status(400).json({
            error: "userID is required"
        })
    }

    // check body list content 
    if ( order.items == null  || order.items.length === 0){
        return res.status(400).json({ 
            error: "items are required"
        })
    }

    for (const items of order.items){ // inspect each item contents 
            if (items.pid == null) {
                return res.status(400).json({
                    error: "pid is required"
                })
            }

            if ( items.qty == null || items.qty <= 0){
            return res.status(400).json({
                error : "quantity must be greater than 0"
            })
        }

    }

    // succsseful 


try {
    const orderID = await createOrder(order)
    // async data log to kafka broker 
    console.log("1. DB order created", orderID)
    console.log("2. About to push Kafka event.")
    await publishOrderCreated(orderID)
    console.log("3. Kafka event published")
    return res.status(201).json({
        message : "Order created",
        orderID

    })

    

    }catch (err) {
        next(err)

        
    }

})



module.exports = router
