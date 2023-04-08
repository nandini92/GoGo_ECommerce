const router = require("express").Router();
const { sendResponse } = require("../utils");

const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

// Method to get all Company details
router.get("/companies/", async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);

  try {
    //Convert string to number
    await client.connect();
    const db = client.db("GoGo");

    const companies = await db.collection("companies").find().toArray();

    return companies.length > 0
      ? sendResponse(res, 200, companies, "Data retrieved from database.")
      : sendResponse(res, 404, companies, "Data not found.");
  } catch (err) {
    sendResponse(res, 400, err);
  } finally {
    await client.close();
  }
});

// Method to get Company details by company ID from Database
router.get("/company/:_id", async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);

  try {
    await client.connect();
    //Convert string to number
    const _id = Number(req.params._id);

    const db = client.db("GoGo");
    const company = await db.collection("companies").findOne({ _id });

    return company !== null
      ? sendResponse(res, 200, company, "Data retrieved from database.")
      : sendResponse(res, 404, company, "Data not found.");
  } catch (err) {
    sendResponse(res, 400, err);
  } finally {
    await client.close();
  }
});

module.exports = router;
