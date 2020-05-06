import React from "react";
import Header from './Header';
import Order from "./Order";
import Inventory from "./Inventory";
import sampleFishes from '../sample-fishes';

class App extends React.Component {
  state = {
    fishes: {},
    order: {}
  };

  loadSampleFishes = () =>{
    this.setState({
      fishes: sampleFishes
    })
  }

  addFish = fish =>{ //How to update a STATE in react?
    //1. take a copy of the existing object in state
    const fishes = { ...this.state.fishes};
    //2. Add our new fish to that fishes variable
    fishes[`fish${Date.now()}`] = fish;
    //3. set the new fishes object to state
    this.setState({
      fishes
    })
  }

  render(){
    return(
      <div className="catch-of-the-day">
        <div className="menu">
          <Header tagline="Fresh Seafood Market"/>{/*calls the Header function */}
        </div>
        <Order/> {/*calls a Order class instance */}
        <Inventory
          addFish={this.addFish}
          loadSampleFishes={ this.loadSampleFishes }
        />
      </div>
    );
  }
}

export default App;