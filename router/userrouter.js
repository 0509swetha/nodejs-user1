"use strict"
const express= require("express");
const{MongoClient}=require("mongodb");
const router=express.Router();
const url="mongodb://127.0.0.1:27017";
const client= new MongoClient(url);
const database="user";
router.post("/user",async(req,res)=>{
    try{
        const connection= await client.connect();
        const dbconnection=await connection.db(database);
        const result=await dbconnection.collection("userdetails").insertOne(req.body);
        res.json(result);
    }catch(error){
        console.log("db connect fun error===",error);
    }
});
router.post("/userdetails",async(req,res)=>{
    try{
        const connection=await client.connect();
        const dbconnection=await connection.db(database);
        const result=await dbconnection.collection("userdetails").insertMany([{
            "id":"23",
            "name":"swetha",
            "location":"kadiri",
            "age":22,
            "gmail":"swetha8@gmail.com"
        },{
            "id":"28",
            "name":"navya",
            "location":"kadapa" ,
            "age":23,
            "gmail": "navya@gmail.com"
        },{
            "id":"2",
            "name":"laddu",
            "location":"anantapur",
            "age":22,
            "gmail":"laddu888@gmail.com"
        }]);
    res.send(result);
    }catch(error){
        console.log("dbconnect fun error===",error);
    }
});
router.get("/oneuser/:name",async(req,res)=>{
    try{
        const connection=await client.connect();
        const dbconnection=await connection.db(database);
        const result=await dbconnection.collection("userdetails").findOne({name:req.params.name});
        res.json(result);
    }catch(error){
        console.log("db connect errror===",error);
    }
});
router.get("/manyuser/:age",async(req,res)=>{
    try{
        const connection=await client.connect();
        const dbconnection=await connection.db(database);
        const result=await dbconnection.collection("userdetails").find({age:req.body.age}).toArray();
        console.log(result);
        res.json(result);

    }catch(error){
        console.log("db connect errror===",error);
    }
});
router.put("/updateone/:name",async(req,res)=>{
    try{
        const connection=await client.connect();
        const dbconnection=await connection.db(database);
        const result=await dbconnection.collection("userdetails").updateOne({name:req.params.name},{$set:{gmail:req.body.gmail,id:req.body.id}});
        res.json(result);

    }catch(error){
        console.log("db connect errror===",error);
    }
});
router.put("/updatemany/:age",async(req,res)=>{
    try{
        const connection=await client.connect();
        const dbconnection=await connection.db(database);
        const result=await dbconnection.collection("userdetails").updateMany({age:req.params.age},{$set:{gmail:req.body.gmail,location:req.body.location,id:req.body.id}});
        res.json(result);

    }catch(error){
        console.log("db connect errror===",error);
    }
});
router.delete("/deleteone/:name",async(req,res)=>{
    try{
        const connection=await client.connect();
        const dbconnection=await connection.db(database);
        const result=await dbconnection.collection("userdetails").deleteOne({name:req.params.name});
        res.json(result);

    }catch(error){
        console.log("db connect errror===",error);
    }
});
router.delete("/deletemany/:age",async(req,res)=>{
    try{
        const connection=await client.connect();
        const dbconnection=await connection.db(database);
        const result=await dbconnection.collection("userdetails").deleteMany({age:req.params.age});
        res.json(result);

    }catch(error){
        console.log("db connect errror===",error);
    }
});

module.exports=router;
