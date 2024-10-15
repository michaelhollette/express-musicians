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
    test("Creates correct data at /musicians/:id", async function (){
        const musician = await Musician.create({ name: "Paul McCartney", instrument: "Bass" });

        const response = await request(app).get(`/musicians/${musician.id}`);
        expect(response.statusCode).toBe(200)
        expect(response.body.name).toBe("Paul McCartney")
    });
    test("Updates correct data at /musicians", async function (){
        await Musician.update({ instrument: "Bass Guitar" }, {where : {name: "Paul McCartney"}});
        
        const updatedMusician = await Musician.findOne({where: {name: "Paul McCartney"}})
        const response = await request(app).get(`/musicians/${updatedMusician.id}`);
        expect(response.statusCode).toBe(200)
        expect(response.body.instrument).toBe("Bass Guitar")
    });
    
    test("Deletes correct data at /musicians/:id", async function (){
        
        const preDeletedMusician = await request(app).get("/musicians");

        await Musician.destroy({where : {name: "Paul McCartney"}});
        const deletedMusician = await request(app).get("/musicians");
        expect(deletedMusician.statusCode).toBe(200)
        expect(deletedMusician.body.length).toBe(preDeletedMusician.body.length - 1)
    });
    
    




    
})
