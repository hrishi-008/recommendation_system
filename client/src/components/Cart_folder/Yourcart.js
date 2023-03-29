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
  const [proID, setproID] = useState([]);
  useEffect(() => {
    fetch(`http://localhost:8000/productDetails/${productID}`)
      .then((res) => res.json())
      .then((data) => setproID(data));
  }, [productID]);

  if (!proID) {
    return <div>Loading...</div>;
  }

  const BuyFunction = async (event) => {
    event.preventDefault();
    alert("Successfully bought");
    await axios.post("http://localhost:8000/productBuy", proID[0])
      .then((response) => {
        console.log(response.data);

      })
      .catch((error) => {
        console.error("Error sending product data:", error);
      });
  };

  return (
    <div>
      <Row className={classes.item}>
        <Col sm={6}>
          <div className={classes.divi}>
            <img src={proID[0]?.imgUrl} alt={proID[0]?.Pname}></img>
          </div>
        </Col>
        <Col className={classes.info}>
          <h2>{proID[0]?.Pname}</h2>
          <br />
          <br />
          <p>
            {proID[0]?.Details}
          </p>
          <Row className={classes.buttonRow}>
            <Col style={{ textAlign: "right" }}>
              <p>Price: $ {proID[0]?.Price}</p>
              {/* <form action="" method="POST"> */}
                <Button onClick={BuyFunction} type="submit" id="buy" variant="primary">
                  Buy Now
                </Button>
              {/* </form> */}
            </Col>
          </Row>
        </Col>
      </Row>
      <Recommendation 
        RproductId = {productID}
      />
    </div>
  );
};
export default Yourcart;




