import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Button, Col, Row } from "react-bootstrap";
import classes from "./Yourcart.module.css";
import axios from "axios";
import Recommendation from "../recommendFolder/Recommend";
const Yourcart = () => {
  //Here useParams() is a hook that allows you to extract dynamic parameters from the URL.It returns an object that contains all the dynamic parameters defined in the URL.

  let { productID } = useParams();
  console.log(productID);
  const [proID, setproID] = useState({});
  const [qty, setqty] = useState(0);
  const fetchData = async () => {
    const response = await fetch(
      `http://localhost:8000/productDetails/${productID}`
    );
    const json = await response.json();
    console.log(json[0]);
    setproID(json[0]);
    setqty(json[0].quantity);
  };
  useEffect(() => {
    fetchData();
  }, [productID,qty]);

  // const BuyFunction = async (event) => {
  //   event.preventDefault();
  //   alert("Successfully bought");
  //   await axios.post("http://localhost:8000/productBuy", proID[0])
  //     .then((response) => {
  //       console.log(response.data);
  //     })
  //     .catch((error) => {
  //       console.error("Error sending product data:", error);
  //     });
  // };
  const BuyFunction = async (event) => {
    console.log(qty);
    if (qty===1) {
      console.log("Only 1 item left");
    }
    if (qty<=0) {
      alert("Product out of stock");
    }
    else{
      event.preventDefault();
      alert("Successfully bought");
      window.location.reload();
      await axios
        .put(`http://localhost:8000/buy/${productID}`, proID)
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          //if the PUT request returns a 400 status code, the .catch() block will be executed and the error message "Product out of stock" will be logged to the console.
          console.error(error.response.data.error);
        });
    }
  };

  return (
    <div>
      <Row className={classes.item}>
        <Col sm={6}>
          <div className={classes.divi}>
            <img src={proID?.imgUrl} alt={proID?.Pname}></img>
          </div>
        </Col>
        <Col className={classes.info}>
          <h2>{proID?.Pname}</h2>
          <br />
          <br />
          <p>{proID?.Details}</p>
          <Row className={classes.buttonRow}>
            <Col style={{ textAlign: "right" }}>
              <p>Price: $ {proID?.Price}</p>
              {/* <form action="" method="POST"> */}
              <Button
                onClick={BuyFunction}
                type="submit"
                id="buy"
                variant="primary"
              >
                Buy Now
              </Button>
              {/* </form> */}
            </Col>
          </Row>
        </Col>
      </Row>
      <Recommendation RproductId={productID} />
    </div>
  );
};
export default Yourcart;

// Hello , I am having two tables in mysql database one is productlist and another is buytable , in productlist one column is for quantity and it would be decreasing by 1 for that product as an when user clicks on buy now button and that product if not in buylist would be added using insert query and if already present then just increasing the value of quantity in buytable by 1 . I am using react , nodejs and mysql for this project , Do help me , will I be needed to use put or patch request for the same. Also provide me with an example.
