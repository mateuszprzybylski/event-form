import React, { Component } from 'react';
import './App.scss';
import AppHeader from './components/AppHeader/AppHeader';

class App extends Component {
  render() {
    return (
      <div className="App">
        <AppHeader header="New event"/>
      </div>
    );
  }
}

export default App;
