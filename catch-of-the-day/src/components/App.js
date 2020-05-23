import React from 'react';
import PropTypes from 'prop-types';
import Header from './Header';
import Order from './Order';
import Inventory from './Inventory';
import sampleFishes from '../sample-fishes';
import Fish from './Fish';
import base from '../base';

class App extends React.Component {
  state = {
    fishes: {},
    order: {},
  };

  static propTypes = {
    match: PropTypes.object,
  };

  componentDidMount() {
    const { match } = this.props;

    // own solution pt 2 reinstate fishes
    const localFishesRef = localStorage.getItem(
      `${match.params.storeId}-fishes`
    );
    if (localFishesRef) {
      this.setState({
        fishes: JSON.parse(localFishesRef),
      });
    }
    // first reinstate ou r localStorage
    const localStorageRef = localStorage.getItem(match.params.storeId);
    if (localStorageRef) {
      this.setState({ order: JSON.parse(localStorageRef) });
    }

    this.ref = base.syncState(`${match.params.storeId}/fishes`, {
      context: this,
      state: 'fishes',
    });
  }

  componentDidUpdate() {
    const { match } = this.props;
    const { order, fishes } = this.state;

    localStorage.setItem(match.params.storeId, JSON.stringify(order));

    // own solution pt1 reinstate fishes
    localStorage.setItem(
      `${match.params.storeId}-fishes`,
      JSON.stringify(fishes)
    );
  }

  componentWillUnmount() {
    console.log('test');
    base.removeBinding(this.ref);
  }

  loadSampleFishes = () => {
    this.setState({
      fishes: sampleFishes,
    });
  };

  addToOrder = key => {
    // take the copy
    const { order } = this.state;
    // add or increment
    order[key] = order[key] + 1 || 1;
    // set order state
    this.setState({ order });
  };

  deleteFromOrder = key => {
    const { order } = this.state;
    order[key] = null;
    delete order[key];
    this.setState({ order });
  };

  addFish = fish => {
    // How to update a STATE in react?
    // 1. take a copy of the existing object in state
    const { fishes } = this.state;
    // 2. Add our new fish to that fishes variable
    fishes[`fish${Date.now()}`] = fish;
    // 3. set the new fishes object to state
    this.setState({ fishes });
  };

  deleteFish = key => {
    const { fishes } = this.state;
    fishes[key] = null;
    this.setState({ fishes });
  };

  updateFish = (key, updatedFish) => {
    const { fishes } = this.state;
    fishes[key] = updatedFish;
    this.setState({ fishes });
  };

  render() {
    const { fishes } = this.state;
    const { match } = this.props;

    return (
      <div className="catch-of-the-day">
        <div className="menu">
          <Header tagline="Fresh Seafood Market" />
          {/* calls the Header function */}
          <ul className="fishes">
            {Object.keys(fishes).map(key => (
              <Fish
                key={key}
                keyValue={key}
                addToOrder={this.addToOrder}
                details={fishes[key]}
              />
            ))}
          </ul>
        </div>
        <Order {...this.state} deleteFromOrder={this.deleteFromOrder} />
        <Inventory
          addFish={this.addFish}
          updateFish={this.updateFish}
          deleteFish={this.deleteFish}
          loadSampleFishes={this.loadSampleFishes}
          fishes={fishes}
          storeId={match.params.storeId}
        />
      </div>
    );
  }
}

export default App;
