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