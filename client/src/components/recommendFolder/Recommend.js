import React, { useState, useEffect } from "react";
import Product from "../product_info_folder/Product.js";
import classes from "./Recommend.module.css";

const Recommendation = (props) => {
  const [data, setData] = useState([]);
useEffect(() => {
    fetch(`http://localhost:8000/recommendInCart/${props.RproductId}`)
      .then((res) => res.json())
      .then((data) => setData(data));
  }, [props.RproductId]);
//   console.log(data);
  return (
    <div>
      <h3>Recommended Products</h3>
      <div className={classes.prodiv}>
        {data.map((datas) => {
          return (
            <Product
              key={datas.Pid}
              id={datas.Pid}
              imgLink={datas.imgUrl}
              productName={datas.Pname}
              MRP={datas.Price}
              description={datas.Details}
              // buyFun={buyFunction}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Recommendation;
