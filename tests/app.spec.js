const request = require("supertest");
const mongoose = require("mongoose");
const {app, server} = require("../app");
const api = request(app);
const ThingsModel = require("../models/things");

beforeAll(async function() {
    await ThingsModel.deleteMany({});
});
afterAll(function() {
    mongoose.connection.close();
    server.close();
})

describe("Test the root path", () => {
    test("Deberia obtener un codigo de estatus 200", async () => {
        await api
        .get("/")
        expect(200)      
    }); 

    test('La lista debe estar vacia', async () => {
        const response = await api
        .get('/things')
        
        expect(response.body.things).toHaveLength(0)

    });

    test("Agregar correctamente una cosa", async () => {
        const thing = {description: "cosa nostra"};
        await api.post("/things").send(thing)        
        .expect(200)
        .expect("Content-type", /application\/json/);
    });    

});