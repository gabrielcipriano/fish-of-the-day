import React, { Component } from 'react';
import PropTypes from 'prop-types';

class EditFishForm extends Component {
  static propTypes = {
    fish: PropTypes.shape({
      image: PropTypes.string,
      name: PropTypes.string,
      price: PropTypes.number,
      desc: PropTypes.string,
      status: PropTypes.string,
    }).isRequired,
    updateFish: PropTypes.func.isRequired,
    deleteFish: PropTypes.func.isRequired,
    keyValue: PropTypes.string.isRequired,
  };

  handleChange = event => {
    const { fish, updateFish, keyValue } = this.props;
    // update that fish
    // take a copy of the current fish
    const updatedFish = {
      ...fish,
      [event.currentTarget.name]: event.currentTarget.value,
    };
    updateFish(keyValue, updatedFish);
  };

  render() {
    const { fish, deleteFish, keyValue } = this.props;

    return (
      <div className="fish-edit">
        <input
          type="text"
          name="name"
          onChange={this.handleChange}
          value={fish.name}
        />
        <input
          type="text"
          name="price"
          onChange={this.handleChange}
          value={fish.price}
        />
        <select
          type="text"
          name="status"
          onChange={this.handleChange}
          value={fish.status}
        >
          <option value="available">Fresh!</option>
          <option value="unavailable">Sold Out!</option>
        </select>
        <textarea name="desc" onChange={this.handleChange} value={fish.desc} />
        <input
          type="text"
          name="image"
          onChange={this.handleChange}
          value={fish.image}
        />
        <button type="button" onClick={() => deleteFish(keyValue)}>
          Remove Fish
        </button>
      </div>
    );
  }
}

export default EditFishForm;
