import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { formatPrice } from '../helpers';

class Fish extends Component {
  handleClick = () => {
    const { addToOrder, keyValue } = this.props;
    addToOrder(keyValue);
  };

  render() {
    const { details } = this.props;
    const { image, name, price, desc, status } = details;
    const isAvailable = status === 'available';
    return (
      <li className="menu-fish">
        <img src={image} alt="" />
        <h3 className="fish-name">
          {name}
          <span className="price">{formatPrice(price)}</span>
        </h3>
        <p>{desc}</p>
        <button
          type="button"
          disabled={!isAvailable}
          onClick={this.handleClick}
        >
          {isAvailable ? 'Add to cart' : 'Sold Out!'}
        </button>
      </li>
    );
  }
}

Fish.propTypes = {
  addToOrder: PropTypes.func.isRequired,
  keyValue: PropTypes.string.isRequired,
  details: PropTypes.object.isRequired,
};

export default Fish;
