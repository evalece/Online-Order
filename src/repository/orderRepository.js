async function insertOrder(pool, userID){

    const result = await pool.query(
        `INSERT INTO orders (user_id)
            VALUES ($1)
            RETURNING id`,
        [userID]
    )
   
    return result.rows[0].id
}

async function insertOrderItem(pool, orderID, item){
            
    await pool.query(
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



async function findOrdersByUserID(pool, userID){ // return all orders base on userID
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
    return result.rows
    }

async function getOrderByID(pool, orderID){ // return all orders based on orderID
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
    findOrderByID,
    findOrdersByUserID,
    getOrderByID

}