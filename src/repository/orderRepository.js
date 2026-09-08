async function insertOrder(client, userID){

    const result = await client.query(
        `INSERT INTO orders (user_id)
            VALUES ($1)
            RETURNING id`,
        [userID]
    )
   
    return result.rows[0].id
}

async function insertOrderItem(client, orderID, item){
            
    await client.query(
        `INSERT INTO order_items (order_id, product_id, qty)
            VALUES ($1, $2, $3)`,
        [orderID, item.pid, item.qty]
    )
}
       

async function findOrderByID(pool, orderID){
    const result = await pool.query(
    `SELECT 
        o.id AS order_id,
        o.user_id,
        oi.product_id,
        oi.qty
        FROM orders o
        JOIN order_items oi
        on o.id =oi.order_id 
        WHERE o.id =$1
        `,
        [orderID]    
)
    return result.rows
}

module.exports ={
    insertOrder,
    insertOrderItem,
    findOrderByID

}