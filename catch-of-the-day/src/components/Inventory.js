import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AddFishForm from './AddFishForm';
import EditFishForm from './EditFishForm';

class Inventory extends Component {
  render() {
    const {
      fishes,
      addFish,
      loadSampleFishes,
      updateFish,
      deleteFish,
    } = this.props;
    return (
      <div className="inventory">
        <h2>Inventory</h2>
        {Object.keys(fishes).map(key => (
          <EditFishForm
            key={key}
            keyValue={key}
            fish={fishes[key]}
            updateFish={updateFish}
            deleteFish={deleteFish}
          />
        ))}
        <AddFishForm addFish={addFish} />
        <button type="button" onClick={loadSampleFishes}>
          Load Sample Fishes
        </button>
      </div>
    );
  }
}

Inventory.propTypes = {
  addFish: PropTypes.func.isRequired,
  loadSampleFishes: PropTypes.func.isRequired,
  fishes: PropTypes.object.isRequired,
  updateFish: PropTypes.func.isRequired,
  deleteFish: PropTypes.func.isRequired,
};

export default Inventory;
