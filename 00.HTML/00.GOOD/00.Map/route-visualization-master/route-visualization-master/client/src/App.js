import React, { Component } from 'react';
import './App.css';
import Map from './containers/Map'
import {Provider} from 'react-redux';
import store from './store';



class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div>
          <Map />
        </div>
      </Provider>
    );
  }
}

export default App;
