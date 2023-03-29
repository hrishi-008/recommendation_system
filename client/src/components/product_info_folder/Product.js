import React from "react";
import { useNavigate } from "react-router";
import classes from "./Product.module.css";
// import { useNavigate } from 'react-router-dom;
const Product = (props) => {
  const navigate = useNavigate();
  const length = props.description.length;
  
  return (
    <div className={classes["main-content"]}>
      <div className={classes["product-list"]}>
        <div className={classes["product-item"]}>
          <img src={props.imgLink} alt="Product"/>
          <h3>{props.productName}</h3>
          <h4>${props.MRP}</h4>
          {length < 80 ? <p>{props.description}.</p> : <p>{props.description.substring(0,80)}...</p> }
          
          <button onClick={()=>navigate(`/productDetails/${props.id}`)} className={classes["add-to-cart"]}>Show more details</button>
          {/* <button onClick={()=>navigate(`/details/${props.id}/${props.productName}/${props.MRP}/${props.description}`)} className={classes["add-to-cart"]}>Show more details</button> */}
        </div>
      </div>
    </div>

  );
};

export default Product;