import React, { Component } from "react";
import "./App.scss";
import AppHeader from "./components/AppHeader/AppHeader";
import EventForm from "./components/EventForm/EventForm";
import { Route, Switch } from "react-router-dom";
import SuccessPage from "./components/EventForm/SuccessPage";
import PageNotFound from "./components/PageNotFound/PageNotFound";

class App extends Component {
  render() {
    return (
      <div className="app">
        <AppHeader header="New event" />
        <div className="app__body">
          <div className="container">
            <Switch>
              <Route exact path="/" component={EventForm} />
              <Route exact path="/success" component={SuccessPage} />
              <Route component={PageNotFound} />
            </Switch>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
