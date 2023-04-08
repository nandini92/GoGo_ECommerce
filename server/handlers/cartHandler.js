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

// Adds a new cart record to the cart collection
router.get("/cart", async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);

  try {
    await client.connect();
    const newOrder = {
      _id: uuidv4(),
      products: [],
    };
    const db = client.db("GoGo");
    const results = await db.collection("carts").insertOne(newOrder);
    return results
      ? sendResponse(res, 201, results, "item added")
      : sendResponse(res, 500, results, "Error creating new order on MongoDb ");
  } catch (error) {
    sendResponse(res, 400, null, `${err}`);
  } finally {
    await client.close();
  }
});

// Add a new item to the cart
router.patch("/cart/:_id", async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  const _id = req.params._id;
  const { product, quantity } = req.body;

  try {
    await client.connect();
    const db = client.db("GoGo");
    // check to see if cart already contains products
    const checkProduct = await db
      .collection("carts")
      .findOne({ _id, products: { $elemMatch: { product } } });

    // Case: cart does not contain product. Add product with quantity.
    if (checkProduct == null) {
      const queryObj = { _id };
      const updateObj = {
        $push: { products: { product: product, quantity: quantity } },
      };

      const updatedCart = await db
        .collection("carts")
        .updateOne(queryObj, updateObj);

      return updatedCart
        ? sendResponse(res, 200, req.body, "[ SUCCESS ]: cart updated")
        : sendResponse(res, 500, req.body, "[ ERROR ]: updating cart in MongoDB");
    }
    // Case: cart contains product. Update quantity for product.
    else {
      const query = { _id, products: { $elemMatch: { product } } };
      const updateQty = { $set: { "products.$.quantity": quantity } };

      const updateQuantity = await db
        .collection("carts")
        .updateOne(query, updateQty);

      return updateQuantity
        ? sendResponse(
            res,
            200,
            req.body,
            "[ SUCCESS ]: quantity updated"
          )
        : sendResponse(res, 400, req.body, "[ ERROR ]: updating cart in MongoDB");
    }
  } catch (error) {
    sendResponse(res, 400, req.body, `${err}`);
  } finally {
    await client.close();
  }
});

// Remove all items from a cart
router.delete("/cart/:_id", async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);

  try {
    await client.connect();
    const db = client.db("GoGo");
    const _id = req.params._id;

    const deleteCart = await db.collection("carts").deleteOne({ _id });

    return deleteCart.deletedCount !== 0
      ? sendResponse(res, 200, { deleteCart }, "Cart deleted")
      : sendResponse(res, 400, "[ ERROR ] Not able to delete cart");
  } catch (error) {
    sendResponse(res, 400, null, `${error}`);
  } finally {
    await client.close();
  }
});

// Gets all items in cart
router.get("/cart/:_id", async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);

  try {
    await client.connect();
    const db = client.db("GoGo");
    const _id = req.params._id;

    const results = await db.collection("carts").findOne({ _id });

    return results
      ? sendResponse(res, 201, results, "Item found")
      : sendResponse(res, 404, results, "Error: Item not found");
  } catch (error) {
    sendResponse(res, 400, null, `${err}`);
  } finally {
    await client.close();
  }
});

// Deletes specific product from cart
router.patch("/remove-product-cart/:_id", async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);

  try {
    await client.connect();
    const db = client.db("GoGo");

    const _id = req.params._id;
    const { product } = req.body;

    const removeItemFromCart = await db
      .collection("carts")
      .updateOne({ _id }, { $pull: { products: { product: product } } });

    return removeItemFromCart.modifiedCount !== 0
      ? sendResponse(res, 200, req.body, "Product removed from cart")
      : sendResponse(
          res,
          400,
          req.body,
          "[ ERROR ] Product was not removed from Cart"
        );
  } catch (error) {
    sendResponse(res, 400, null, `${err}`);
  } finally {
    await client.close();
  }
});

module.exports = router;
