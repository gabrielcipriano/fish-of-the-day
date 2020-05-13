import React from 'react';
import PropTypes from 'prop-types';
import { getFunName, slugify } from '../helpers';

class StorePicker extends React.Component {
  myInput = React.createRef();

  goToStore = event => {
    const { history } = this.props;
    // 1. Stop the form from submitting
    event.preventDefault();
    // 2. get the text fromthat input
    const storeName = this.myInput.current.value;
    // 3. change the page to /store/whatever-is-the-name
    history.push(`/store/${slugify(storeName)}`);
  };

  render() {
    return (
      <form className="store-selector" onSubmit={this.goToStore}>
        {/* this is a comment inside JSX */}
        <h2>Please enter a store</h2>
        <input
          type="text"
          ref={this.myInput}
          required
          placeholder="Store Name"
          defaultValue={getFunName()}
        />
        <button type="submit">Visit Store </button>
      </form>
    );
  }
}

StorePicker.propTypes = {
  history: PropTypes.object,
};

export default StorePicker;
