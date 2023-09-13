import express from "express";
import jwt from "jsonwebtoken";
import { connectToDb, dbCollection } from "./database.js";

const app = express();

app.use(express.json());
connectToDb();

app.post("/login", async (req, res) => {
    try {
        const { username, password } = req.body;
        const foundUser = await dbCollection["users"].findOne({
            username,
            password,
        });

        if (foundUser) {
            const token = jwt.sign({ username: foundUser.username }, "secret");
            res.json({ token });
        } else {
            res.status(401).send("Unauthorized");
        }
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal Server Error");
    }
});

async function decryptToken(req, res, next) {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decodedToken = jwt.decode(token);
        req.username = decodedToken;
        next();
    } catch (error) {
        console.error(error);
        res.status(401).send("Unauthorized");
    }
}

async function verifyUser(req, res, next) {
    try {
        const { username } = req.username;
        const foundUser = await dbCollection["users"].findOne({ username });
        if (foundUser) {
            next();
        } else {
            res.status(401).send("Unauthorized");
        }
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
}

app.get("/inventory", decryptToken, verifyUser, async (req, res) => {
    try {
        let lowQuantity = parseInt(req.query.lowQuantity);
        if (lowQuantity > 0) {
            const products = await dbCollection["inventory"]
                .find({ instock: { $lt: 100 } })
                .toArray();
            res.json(products);
        } else {
            const products = await dbCollection["inventory"].find().toArray();
            res.json(products);
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
});

app.get("/order", decryptToken, verifyUser, async (req, res) => {
    try {
        const orders = await dbCollection["order"].find().toArray();

        for (let order of orders) {
            const item = order.item;
            const entry = await dbCollection["inventory"].findOne({
                sku: item,
            });
            const description = entry.description;
            order.description = description;
        }

        res.json(orders);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
});

app.listen(3000, () => {
    console.log("Listening on port 3000");
});
