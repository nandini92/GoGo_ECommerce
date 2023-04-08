const router = require("express").Router();
const { sendResponse } = require("../utils");

const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

//returns an array of all Items
router.get("/items", async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);

  try {
    await client.connect();

    const db = client.db("GoGo");
    const items = await db.collection("items").find().toArray();

    return items
      ? sendResponse(res, 200, items, "Successfully retrieved all items!")
      : sendResponse(res, 404, items, "Could not find items!");
  } catch (err) {
    sendResponse(res, 400, err);
  } finally {
    await client.close();
  }
});

//returns item based on ID
router.get("/item/:_id", async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);

  try {
    await client.connect();
    const _id = Number(req.params._id);

    const db = client.db("GoGo");

    const item = await db.collection("items").findOne({ _id });

    return item
      ? sendResponse(res, 200, item, "Successfully retrieved item!")
      : sendResponse(res, 404, item, "Could not find specific item, check id!");
  } catch (err) {
    sendResponse(res, 400, err);
  } finally {
    await client.close();
  }
});

module.exports = router;
