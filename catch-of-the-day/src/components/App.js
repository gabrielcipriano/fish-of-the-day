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

    //own solution pt 2 reinstate fishes
    const localFishesRef = localStorage.getItem(params.storeId+"-fishes");
    if (localFishesRef) {
      this.setState({
        fishes: JSON.parse(localFishesRef)
      })
    }
    //first reinstate ou r localStorage
    const localStorageRef = localStorage.getItem(params.storeId);
    if(localStorageRef) {
      this.setState({ order: JSON.parse(localStorageRef)})
    }


    this.ref = base.syncState(`${params.storeId}/fishes`, {
      context: this,
      state: "fishes"
    });
  }

  componentDidUpdate(){
    localStorage.setItem(
      this.props.match.params.storeId,
      JSON.stringify(this.state.order)
    );

    //own solution pt1 reinstate fishes
    localStorage.setItem(
      this.props.match.params.storeId + "-fishes",
      JSON.stringify(this.state.fishes)
    );
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
          fishes={this.state.fishes}
        />
      </div>
    );
  }
}

export default App;