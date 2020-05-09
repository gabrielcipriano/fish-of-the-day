import React, { Component } from 'react'
import {formatPrice} from "../helpers"

class Order extends Component {
  renderOrder = (key) => {
    const fish = this.props.fishes[key];
    const count = this.props.order[key];
    const isAvailable = fish.status === 'available';
    if(!isAvailable){
      return (<li key={key} >
        Sorry {fish ? fish.name : 'fish'} is no longer available
      </li>)
    }
    return (<li key={key}>
      {count}kg {fish.name}
      -formatPrice(count * fish.price)}
    </li>)
  };

  render() {
    const orderIds = Object.keys(this.props.order);
    const total = orderIds.reduce((prevTotal, key) =>{
      const fish = this.props.fishes[key];
      const count = this.props.order[key];
      const isAvailable = fish && fish.status === 'available';
      return isAvailable ? (prevTotal + (count*fish.price)) : prevTotal;
    }, 0);

    return <div className="Order-wrap">
      <h2>Your Order</h2>
      <ul className="order">
        {orderIds.map(this.renderOrder)}
      </ul>
      <div className="total">
        <strong>{formatPrice(total)}</strong>
      </div>
    </div>;
  }
}

export default Order
