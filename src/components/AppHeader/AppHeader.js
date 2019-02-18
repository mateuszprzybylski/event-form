import React from "react";
import "./AppHeader.scss";

const AppHeader = ({ header }) => {
  return (
    <header className="app-header">
      <div className="container">
        <h1>{header}</h1>
      </div>
    </header>
  );
};

export default AppHeader;
