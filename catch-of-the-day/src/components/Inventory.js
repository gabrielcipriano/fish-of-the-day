import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Firebase from 'firebase';
import AddFishForm from './AddFishForm';
import EditFishForm from './EditFishForm';
import Login from './Login';
import base, { firebaseApp } from '../base';

class Inventory extends Component {
  static propTypes = {
    addFish: PropTypes.func.isRequired,
    loadSampleFishes: PropTypes.func.isRequired,
    updateFish: PropTypes.func.isRequired,
    deleteFish: PropTypes.func.isRequired,
    fishes: PropTypes.shape({
      image: PropTypes.string,
      name: PropTypes.string,
      price: PropTypes.number,
      desc: PropTypes.string,
      status: PropTypes.string,
    }).isRequired,
    storeId: PropTypes.string.isRequired,
  };

  state = {
    uid: null,
    owner: null,
  };

  // stay logged in even when the page refrashes
  componentDidMount() {
    Firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.authHandler({ user });
      }
    });
  }

  authenticate = provider => {
    const authProvider = new Firebase.auth[`${provider}AuthProvider`]();
    firebaseApp
      .auth()
      .signInWithPopup(authProvider)
      .then(this.authHandler);
  };

  logout = async () => {
    await Firebase.auth().signOut();
    this.setState({ uid: null });
  };

  authHandler = async authData => {
    const { storeId } = this.props;
    // 1. Look up the current store in the firebase database
    const store = await base.fetch(storeId, { context: this });
    console.log(store);
    // 2. Claim it if there is no owner
    if (!store.owner) {
      // save it as our own
      await base.post(`${storeId}/owner`, {
        data: authData.user.uid,
      });
    }
    // 3. Ste the state of the inventory component to reflect the current user
    this.setState({
      uid: authData.user.uid,
      owner: store.owner || authData.user.uid,
    });
  };

  render() {
    const logout = (
      <button type="button" onClick={this.logout}>
        Log out!
      </button>
    );
    const { uid, owner } = this.state;
    // 1. Check if they are logged in
    if (!uid) {
      return <Login authenticate={this.authenticate} />;
    }
    // 2. Check if they are not the owner of the store
    if (uid !== owner) {
      return (
        <div>
          <p>Sorry you're not the owner!</p>
          {logout}
        </div>
      );
    }
    // 3. They must be the owner, just render the inventory
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
        {logout}
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

export default Inventory;
