const express = require("express");
const morgan = require("morgan");

const createServer = () => {
  const app = express();

  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Methods",
      "OPTIONS, HEAD, GET, PUT, POST, DELETE"
    );
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
  });

  app.use(morgan("tiny"));
  app.use(express.static("./server/assets"));
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use("/", express.static(__dirname + "/"));

  app.use(require("./handlers/usersHandler"));
  app.use(require("./handlers/cartHandler"));
  app.use(require("./handlers/companiesHandler"));
  app.use(require("./handlers/itemsHandler"));
  app.use(require("./handlers/ordersHandler"));

  return app;
};

const sendResponse = (res, status, data, message = "No message included.") => {
  return res.status(status).json({ status, data, message });
};

// Method that handles opening and closing connections to database
/*const connectToDatabase = async (action) => {
  const { MongoClient } = require("mongodb");
  require("dotenv").config();
  const { MONGO_URI } = process.env;

  const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };

  const client = new MongoClient(MONGO_URI, options);
await client.connect();
  switch (action) {
    case "open": {
      await client.connect();
      console.log("Database has connected successfully!");

      return client.db("FinalProject");
    }
    case "close": {
      console.log(client);
      client.close();
      console.log("Database has disconnected successfully!");

      return;
    }
  }
};

*/
module.exports = { sendResponse, createServer };
