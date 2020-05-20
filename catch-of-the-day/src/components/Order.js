import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { formatPrice } from '../helpers';

class Order extends Component {
  renderOrder = key => {
    const { fishes, order, deleteFromOrder } = this.props;
    const fish = fishes[key];
    const count = order[key];
    const isAvailable = fish && fish.status === 'available';

    const transitionOptions = {
      classNames: 'order',
      key,
      timeout: { enter: 400, exit: 400 },
    };

    if (!isAvailable) {
      return (
        <CSSTransition {...transitionOptions}>
          <li key={key}>
            Sorry {fish ? fish.name : 'fish'} is no longer available
            <button type="button" onClick={() => deleteFromOrder(key)}>
              &times;
            </button>
          </li>
        </CSSTransition>
      );
    }
    return (
      <CSSTransition {...transitionOptions}>
        <li key={key}>
          <span>
            <TransitionGroup component="span" className="count">
              <CSSTransition
                classNames="count"
                key={count}
                timeout={{ enter: 400, exit: 400 }}
              >
                <span>{count}</span>
              </CSSTransition>
            </TransitionGroup>
            kg {`${fish.name} `}
            {formatPrice(count * fish.price)}
            <button type="button" onClick={() => deleteFromOrder(key)}>
              &times;
            </button>
          </span>
        </li>
      </CSSTransition>
    );
  };

  render() {
    const { order, fishes } = this.props;
    const orderIds = Object.keys(order);
    const total = orderIds.reduce((prevTotal, key) => {
      const fish = fishes[key];
      const count = order[key];
      const isAvailable = fish && fish.status === 'available';
      return isAvailable ? prevTotal + count * fish.price : prevTotal;
    }, 0);

    return (
      <div className="Order-wrap">
        <h2>Your Order</h2>
        <TransitionGroup component="ul" className="order">
          {orderIds.map(this.renderOrder)}
        </TransitionGroup>
        <div className="total">
          <strong>{formatPrice(total)}</strong>
        </div>
      </div>
    );
  }
}

Order.propTypes = {
  order: PropTypes.object.isRequired,
  fishes: PropTypes.object.isRequired,
  deleteFromOrder: PropTypes.func.isRequired,
};

export default Order;
