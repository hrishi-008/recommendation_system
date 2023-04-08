const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "ecom",
});

app.get("/message", (req, res) => {
  connection.connect((err) => {
    //This connection was only for implementing the select query
    if (err) {
      console.log(err);
      return;
    }
    console.log("Database connected");
    connection.query("select * from productlist", (err, results) => {
      if (err) {
        console.log(err);
      }
      res.json(results);
    });
    // connection.end();
  });
});

app.get("/productDetails/:productID", (req, res) => {
  const pd = req.params.productID;
  const query = `SELECT * FROM productlist WHERE Pid = '${pd}'`;
  connection.connect((err) => {
    if (err) {
      console.log(err);
      return;
    }
    console.log("Data fetched from get request");
    connection.query(query, (err, results) => {
      if (err) {
        console.log(err);
      }
      res.json(results);
    });
  });
});

app.get("/recommendInCart/:productID", (req, res) => {
  const pd = req.params.productID.charAt(0);

  console.log(pd);
  const query = `SELECT * FROM productlist WHERE Pid like '${pd}%'`;
  connection.connect((err) => {
    if (err) {
      console.log(err);
      return;
    }
    console.log("Data fetched from recommendate Cart");
    connection.query(query, (err, results) => {
      if (err) {
        console.log(err);
      }
      res.json(results);
    });
  });
});

app.put("/buy/:productID", (req, res) => {
  const productID = req.params.productID;
  console.log(productID);
  const query = `select * from productlist where pid = '${productID}'`;
  connection.query(query, (err, results) => {
    // console.log(results);
    if (err) {
      console.log(err);
    }
    const id = results[0].Pid;
    const name = results[0].Pname;
    const price = results[0].Price;
    const details = results[0].Details;
    const imgURL = results[0].imgUrl;
    const quantity = results[0].quantity;

    console.log(quantity);
    if (quantity === 0) {
      console.log("No more products can be bought");
      // return res.status(400).json({ error: "Product out of stock" });
    }
    connection.beginTransaction((err) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: "Server error" });
      }
      const updateProductlist = `update productlist set quantity = ${
        quantity - 1
      } where pid = '${productID}'`;
      connection.query(updateProductlist, (err, results) => {
        if (err) {
          console.log(err);
          connection.rollback();
          return res.status(500).json({ error: "Server error" });
        }
      });

      const checkQuery = `select * from buytable where Bid = "${id}"`;
      connection.query(checkQuery, (err, results) => {
        // console.log(results);
        if (err) throw err;
        if (results.length === 0) {
          // Product doesn't exist in buytable, so insert new row
          const insertQuery =
            "insert into BuyTable values('" +
            id +
            "','" +
            name +
            "','" +
            price +
            "','" +
            details +
            "','" +
            imgURL +
            "','" +
            1 +
            "')";
          connection.query(insertQuery, (err, results) => {
            if (err) throw err;
            console.log(results);
            console.log("Product added to buylist");
          });
        } else {
          // Product already exists in buytable, so update quantity
          const currentQuantity = results[0].quantity;
          const updateQuery = `UPDATE buytable SET quantity = ${
            currentQuantity + 1
          } WHERE Bid = "${id}"`;
          connection.query(updateQuery, (err, results) => {
            if (err) throw err;
            console.log("Quantity updated in buytable");
            console.log(results);
          });
        }
      });
    });
  });
});
                                      
app.listen(8000, () => {
  console.log(`Server is running on port 8000.`);
});
