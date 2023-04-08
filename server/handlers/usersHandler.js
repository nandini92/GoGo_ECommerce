const router = require("express").Router();
const { sendResponse } = require("../utils");
const { v4: uuidv4 } = require("uuid");

const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

//endpoint to create new user sign in
router.post("/sign-up", async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);

  try {
    await client.connect();

    const user = { ...req.body, _id: uuidv4() };

    const db = client.db("GoGo");
    const verifyUser = await db
      .collection("users")
      .findOne({ email: user.email });

    if (verifyUser?.password !== undefined) {
      sendResponse(
        res,
        403,
        user.email,
        "[SUCCESS] User already exists. Please proceed to Sign In."
      );
    } else {
      const newUser = await db.collection("users").insertOne({ ...user });

      newUser
        ? sendResponse(res, 201, newUser, "[SUCCESS] New user created.")
        : sendResponse(
            res,
            404,
            newUser,
            "[ERROR] User was not created. Please try again."
          );
    }
  } catch (err) {
    sendResponse(res, 400, null, `${err}`);
  } finally {
    await client.close();
  }
});

//endpoint to handle user sign in
router.post("/sign-in", async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);

  try {
    await client.connect();

    const { email, password } = req.body;
    const db = client.db("GoGo");

    const verifyUser = await db
      .collection("users")
      .findOne({ email, password });
    const data = { ...verifyUser };

    verifyUser
      ? sendResponse(res, 200, data, "[SUCCESS] User found.")
      : sendResponse(res, 404, data, "[ERROR] User not found.");
  } catch (err) {
    sendResponse(res, 400, null, `${err}`);
  } finally {
    await client.close();
  }
});

module.exports = router;
