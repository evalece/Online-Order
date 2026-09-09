const request = require("supertest")
const app = require("../src/app")

describe( "GET /orders/userOrder/9999" , () => {
    test("should handle non-existing userID", async () =>{
        const response = await request(app)
        .get("/orders/userOrder/9999")

        expect(response.statusCode).toBe(404)
        expect(response.body).toEqual({
            error: "User is not found"
        })
    })

    }
) 

describe( "GET /orders/8" , () => { // 
    test("should handle non-existing userID", async () =>{
        const response = await request(app)
        .get("/orders/8")

        expect(response.statusCode).toBe(200)
        expect(response.body).toEqual({ // returning single order 
              "id": 8,
                "userID": 2,
                "items": [
                    {
                    "pid": 2,
                    "qty": 2
                    }
                ]
            }) //end of response body
        }) // end of test

    }
) 


describe( "GET /orders/userOrder/1" , () => { // 
    test("should handle non-existing userID", async () =>{
        const response = await request(app)
        .get("/orders/userOrder/1")

        expect(response.statusCode).toBe(200)
        expect(response.body).toEqual([{
                "id": 1,
                "userID": 1,
                "items": [
                {
                    "pid": 1,
                    "qty": 1
                }
                ]
            },
            {
                "id": 2,
                "userID": 1,
                "items": [
                {
                    "pid": 1,
                    "qty": 1
                }
                ]
            },
            {
                "id": 3,
                "userID": 1,
                "items": [
                {
                    "pid": 1,
                    "qty": 1
                }
                ]
            },
            {
                "id": 4,
                "userID": 1,
                "items": [
                {
                    "pid": 2,
                    "qty": 2
                }
                ]
            },
            {
                "id": 5,
                "userID": 1,
                "items": [
                {
                    "pid": 2,
                    "qty": 2
                }
                ]
            }]) //end of response body
        }) // end of test

    }
) 
