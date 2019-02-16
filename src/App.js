import React, { Component } from 'react';
import './App.scss';
import AppHeader from './components/AppHeader/AppHeader';
import EventForm from './components/EventForm/EventForm';

class App extends Component {
  render() {
    return (
      <div className="app">
        <AppHeader header="New event"/>
        <div className="app__body">
          <div className="container">
            <EventForm/>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
