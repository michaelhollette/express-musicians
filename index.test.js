// install dependencies
const { execSync } = require('child_process');
execSync('npm install');
execSync('npm run seed');

const request = require("supertest")
const { db } = require('./db/connection');
const { Musician } = require('./models/index')
const app = require('./src/app');
const {seedMusician} = require("./seedData");


describe('./musicians endpoint', () => {
    // Write your tests here
    test("Makes a successful connection", async function (){
        const response = await request(app).get("/musicians");
        expect(response.statusCode).toBe(200)
    });
    test("Receives correct data", async function (){
        const response = await request(app).get("/musicians");
        const responseData = await JSON.parse(response.text);
        expect(responseData[0].name).toBe("Mick Jagger")
    });
    
    




    
})
