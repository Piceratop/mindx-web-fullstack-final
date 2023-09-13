import { MongoClient } from "mongodb";

const connectionURL = "mongodb://127.0.0.1:27017";
const databaseName = "final-project";

const dbCollection = {};

async function connectToDb() {
    const client = await MongoClient.connect(connectionURL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    console.log("Connected correctly to server");
    const db = client.db(databaseName);
    dbCollection.users = db.collection("users");
    dbCollection.inventory = db.collection("inventory");
    dbCollection.order = db.collection("order");
}

export { connectToDb, dbCollection };
