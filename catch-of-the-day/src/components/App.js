import React from "react";
import Header from './Header';
import Order from "./Order";
import Inventory from "./Inventory";
import sampleFishes from '../sample-fishes';
import Fish from "./Fish";
import base from "../base";

class App extends React.Component {
  state = {
    fishes: {},
    order: {}
  };

  componentDidMount(){
    const { params } = this.props.match;
    this.ref = base.syncState(`${params.storeId}/fishes`, {
      context: this,
      state: "fishes"
    });
  }
  componentWillUnmount(){
    console.log("test");
    base.removeBinding(this.ref);
  }


  loadSampleFishes = () =>{
    this.setState({
      fishes: sampleFishes
    })
  }

  addToOrder = (key) => {
    //take the copy
    const order = { ...this.state.order };
    //add or increment
    order[key] = order[key] + 1 || 1;
    //set order state
    this.setState({
      order: order
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
          <ul className="fishes">
            { Object.keys(this.state.fishes).map(key => (
              <Fish
                key={key}
                index={key}
                addToOrder={this.addToOrder}
                details={ this.state.fishes[key]}
              />
            )) }
          </ul>
        </div>
        <Order {...this.state} /> {/*calls a Order class instance */}
        <Inventory
          addFish={this.addFish}
          loadSampleFishes={ this.loadSampleFishes }
        />
      </div>
    );
  }
}

export default App;