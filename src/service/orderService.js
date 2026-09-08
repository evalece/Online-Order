const pool = require("../db")
const { 
    insertOrder,
    insertOrderItem,
    findOrderByID,
    findOrdersByUserID,
    getOrderByID
 } = require("../repository/orderRepository")

async function createOrder(order) {
    const client = await pool.connect()

    try {
        await client.query("BEGIN")
        const orderID = await insertOrder(
            client, 
            order.userID
        )

        for (const item of order.items) {
            await insertOrderItem(
                client,
                orderID,
                item
            )
        }

        await client.query("COMMIT")
        return orderID

    } catch (err) {
        await client.query("ROLLBACK")
        throw err

    } finally {
        client.release()
    }
}
 
async function getUserOrder(userID){ // return all orders base on userID
    
    const result = await findOrdersByUserID(pool, userID)
  
    if (result.length === 0) {
        return null
    }

    const orderMap = new Map()
    for (const row of result){
        if (! orderMap.has(row.order_id)){
            orderMap.set(row.order_id, {
                id: row.order_id,
                userID:row.user_id,
                items:[]
            })
        }
        orderMap.get(row.order_id).items.push({
            pid: row.product_id,
            qty: row.qty
        })
    }
    

    return Array.from(orderMap.values())

}

async function getOrder(orderID){ // return all orders based on orderID
    const result = await getOrderByID(pool, orderID)
    
    if (result.length === 0) {
        return null
    }

    const rows= result

    const order ={
        id: rows[0].order_id,
        userID : rows[0].user_id,
        items: rows.map((rows)=>({
            pid: rows.product_id,
            qty : rows.qty
        }) )
    }
    return order
}

module.exports = {
    createOrder,
    getOrder,
    getUserOrder
}