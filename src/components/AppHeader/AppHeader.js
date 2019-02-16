import React from 'react';
import './AppHeader.scss';

const AppHeader = ({header}) => {
  return (
    <header className="app-header">
      <div className="container">
        {header}
      </div>
    </header>
  )
}

export default AppHeader;