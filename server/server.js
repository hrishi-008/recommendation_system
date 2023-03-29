const express = require("express");
const cors = require("cors");
const mysql = require('mysql2');
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
})

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

app.get("/productDetails/:productID",(req,res)=>{

  const pd = req.params.productID;
  const query = `SELECT * FROM productlist WHERE Pid = '${pd}'`;
  connection.connect((err)=>{
    if (err) {
      console.log(err);
      return;
    }
    console.log("Data fetched");
    connection.query(query, (err,results)=>{
      if (err) {
        console.log(err);
      }
      res.json(results);
    });
  })
})

app.get("/recommendInCart/:productID",(req,res)=>{
  const pd = req.params.productID.charAt(0);
  
  console.log(pd);
  const query = `SELECT * FROM productlist WHERE Pid like '${pd}%'`;
  connection.connect((err)=>{
    if (err) {
      console.log(err);
      return;
    }
    console.log("Data fetched");
    connection.query(query, (err,results)=>{
      if (err) {
        console.log(err);
      }
      res.json(results);
    });
  })


})

app.post("/productBuy",(req,res)=>{
  const id = req.body.Pid;
  const name = req.body.Pname;
  const price = req.body.Price;
  const details = req.body.Details;
  const imgURL = req.body.imgUrl;
  console.log(id);
  // res.json("successwefd");

  connection.connect((err)=>{
            if (err) {
                console.log(err);
                return;
            }
            var sql = "insert into BuyTable values('"+id+"','"+name+"','"+price+"','"+details+"','"+imgURL+"')";
            connection.query(sql,(err,result)=>{
                if (err) throw err;
                console.log(result);
                // res.send("Item bought successfully "+result);
            });
    
        })
})

app.listen(8000, () => {
  console.log(`Server is running on port 8000.`);
});
