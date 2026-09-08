async function insertOrder(client, userID){

    const orderResult = await client.query(
        `INSERT INTO orders (user_id)
            VALUES ($1)
            RETURNING id`,
        [userID]
    )

}

async function insertOrderItem(client, orderID, item){
            
    await client.query(
        `INSERT INTO order_items (order_id, product_id, qty)
            VALUES ($1, $2, $3)`,
        [orderID, item.pid, item.qty]
    )
}
       

async function findOrderByID(pool, orderID){
    
}


 
async function getUserOrder(userID){ // return all orders base on userID
    const result= await pool.query(
                `SELECT 
            o.id AS order_id,
            o.user_id,
            oi.product_id,
            oi.qty
            FROM orders o
            JOIN order_items oi
            on o.id =oi.order_id 
            WHERE o.user_id =$1
            `,
            [userID]    
    )
    if (result.rows.length === 0) {
        return null
    }
        const rows= result.rows

    const orderMap = new Map()
    for (const row of result.rows){
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
    if (result.rows.length === 0) {
        return null
    }

    const rows= result.rows

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
