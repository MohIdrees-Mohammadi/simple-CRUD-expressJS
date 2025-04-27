import { MongoClient } from "mongodb";

let connectionObject;


const connectToDB = async (cb) => {
    const url = 'mongodb://localhost:27017/MyStore'
    try {
        const mongoDB_client = await MongoClient.connect(url)
        connectionObject = mongoDB_client.db()
        return cb()
    } catch (error) {
       console.log(error)
       return cb(error)
    }

}


const getDb = ()=> connectionObject


export {connectToDB, getDb}