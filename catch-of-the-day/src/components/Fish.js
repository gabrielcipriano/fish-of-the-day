import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { formatPrice } from '../helpers';

class Fish extends Component {
  static propTypes = {
    addToOrder: PropTypes.func.isRequired,
    keyValue: PropTypes.string.isRequired,
    details: PropTypes.shape({
      image: PropTypes.string,
      name: PropTypes.string,
      price: PropTypes.number,
      desc: PropTypes.string,
      status: PropTypes.string,
    }).isRequired,
  };

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

export default Fish;
