import React  from "react";
import Navbar from "./components/navbar_folder/Navbar.js";
// import classes from "./App.module.css";

import ProductList from "./components/Productlist_fol/ProductList.js";
import {Route, Routes} from "react-router";
import Yourcart from "./components/Cart_folder/Yourcart"

function App() {
  // const [data, setData] = useState([]);

  return (
    <React.Fragment>

    <header>
      <Navbar />
    </header>

    <main>

      <Routes>
      <Route path="/productDetails/:productID" element={<Yourcart/>}/> 
      {/* <Route path="/Recom" element={<Recommendation />}/> */}
      <Route path="/" element={<>
      {/* <Recommendation/> */}
      <ProductList />
      </>
      }/>
      
      
      </Routes>
    </main>
    </React.Fragment>
      
  );
}

export default App;
