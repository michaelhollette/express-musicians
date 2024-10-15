const express = require("express");
const app = express();
const { Musician } = require("../models/index")
const { db } = require("../db/connection")

const port = 3000;

//TODO: Create a GET /musicians route to return all musicians 
app.get("/musicians", async (request, response)=>{
    const musicians = await Musician.findAll();
    response.json(musicians)
})
app.get("/musicians/:id", async (req,res) =>{
    let musician = await Musician.findByPk(Number(req.params.id));
    res.json(musician) 
})


app.use(express.json());
app.use(express.urlencoded());

app.post('/musicians', async (req,res) =>{
    await Musician.create(req.body);
    const musicians = await Musician.findAll();

    res.json(musicians)
})
app.put('/musicians/:id', async (req,res) =>{

    await Musician.update(req.body, {where: {id :req.params.id}});
    const musicians = await Musician.findAll();

    res.json(musicians)
})

app.delete('/musicians/:id', async (req,res) =>{
    await Musician.destroy({where: {id : req.params.id}});
    const musicians = await Musician.findAll();

    res.json(musicians)
})


module.exports = app;