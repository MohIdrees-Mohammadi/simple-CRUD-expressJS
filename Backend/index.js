import express from "express"
import { connectToDB, getDb } from "./DB-config/db-config.js"
import { ObjectId } from "mongodb"


const app = express()
const PORT = 3000
app.use(express.json())

let db;





connectToDB((err)=>{
    if (!err){
        console.log("The db has connected successfully")
        app.listen(PORT, ()=> console.log(`The server is running on http://localhost:${PORT}`))
        db = getDb()
    } else {
        console.log("SOmething happened which the connection has not been established")
    }
})

// ROUTES 


app.get("/api/products", (req, res)=> {
    if(!db) {
        res.send("DB connection is not established")
    }
    db.collection("Products")
        .find()
        .toArray()
        .then((result) => res.send(result))
        .catch(()=> res.send("Error while retreving the data"))
})


app.post("/api/products", (req, res)=>{
    const data = req.body
    if(!db) {
        res.send("DB connection is not established")
    }
    db.collection("Products")
        .insertOne(data)
        .then(()=> res.send("The data has been successfully added"))
        .catch(()=> res.send("Internal server error"))
})

app.put("/api/products/:id", (req, res)=>{
    const {id} = req.params
    const data = req.body
    let obj_id;
  
    
    if(!db) {
        res.send("DB connection is not established")
    }

    try {
       obj_id = new ObjectId(id)
    } catch (error) {
        res.send('ID is not valid')
    }

    db.collection("Products")
        .updateOne({_id: obj_id }, {$set: data})
        .then(()=> res.send("The data has been updated successfully"))
        .catch(()=> res.send("Could not update the data"))
})

app.delete("/api/products/:id", (req, res)=> {
    const {id} = req.params
    let obj_id;
    if(!db) {
        res.send("DB connection is not established")
    }

    try {
        obj_id = new ObjectId(id)
     } catch (error) {
         res.send('ID is not valid')
     }

    db.collection("Products")
        .deleteOne({_id: obj_id})
        .then(()=> res.send("The data has been deleted successfully"))
        .catch(()=> res.send("Could not delete the data"))
})