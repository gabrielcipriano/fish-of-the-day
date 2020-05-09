import React from 'react';
import { getFunName, slugify } from "../helpers";

class StorePicker extends React.Component{
  myInput = React.createRef();

  goToStore = event => {
    //1. Stop the form from submitting
    event.preventDefault();
    //2. get the text fromthat input
    const storeName = this.myInput.current.value;
    //3. change the page to /store/whatever-is-the-name
    this.props.history.push(`/store/${slugify(storeName)}`);
  };
  render() {
    return (
        <form className="store-selector" onSubmit={this.goToStore}>
          {/*this is a comment inside JSX */}
          <h2>Please enter a store</h2>
          <input
            type="text"
            ref={this.myInput}
            required
            placeholder="Store Name"
            defaultValue={ getFunName() }
          />
          <button type="submit">Visit Store </button>
        </form>
    );
  }
}

export default StorePicker;