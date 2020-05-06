import React from "react";
import Header from './Header';
import Order from "./Order";
import Inventory from "./Inventory"

class App extends React.Component {
  render(){
    return(
      <div className="catch-of-the-day">
        <div className="menu">
          <Header tagline="Fresh Seafood Market"/>{/*calls the Header function */}
        </div>
        <Order/> {/*calls a Order class instance */}
        <Inventory/>
      </div>
    );
  }
}

export default App;