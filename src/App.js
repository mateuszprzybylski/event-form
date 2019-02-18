import React, { Component } from "react";
import "./App.scss";
import AppHeader from "./components/AppHeader/AppHeader";
import EventForm from "./components/EventForm/EventForm";
import { Route, Switch } from "react-router-dom";
import InfoPage from "./components/InfoPage/InfoPage";
import { HashRouter } from "react-router-dom";
import { SECTION_TYPE } from "./components/Section/Section";

class App extends Component {
  render() {
    return (
      <div className="app">
        <AppHeader header="New event" />
        <div className="app__body">
          <div className="container">
            <HashRouter>
              <Switch>
                <Route exact path="/" component={EventForm} />
                <Route
                  exact
                  path="/success"
                  render={() => (
                    <InfoPage
                      header="Success"
                      message="Event has been created"
                      type={SECTION_TYPE.SUCCESS}
                    />
                  )}
                />
                <Route
                  render={() => (
                    <InfoPage
                      header="404"
                      message="Page not found"
                      type={SECTION_TYPE.WARNING}
                    />
                  )}
                />
              </Switch>
            </HashRouter>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
