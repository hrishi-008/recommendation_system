import React, { useState, useEffect } from "react";
import Product from "../product_info_folder/Product.js";
import classes from "./ProductList.module.css";
// import Recommendation from "./components/recommendFolder/Recommend.js";

const ProductList = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8000/message")
      .then((res) => res.json())
      // .then((response) => console.log(response));
      .then((response) => setData(response));

  }, []);
  
  return (
    <div>

      <hr></hr>
      <h2>Products to buy</h2>
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

export default ProductList;
