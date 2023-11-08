const express= require("express");
const{MongoClient}=require("mongodb");
const app=express();
app.use(express.json());
const userrouter=require("./router/userrouter");
          app.use(userrouter);
app.listen(4000,()=>{
    console.log("server running of port 4000");
});