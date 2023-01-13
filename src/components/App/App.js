import React from "react";

// eslint-disable-next-line import/order
import TabsSelector from "../TabsSelector";

// import Main from "../Main";

import "./App.styles.css";
// import Card from "../Card";

const Grid = () => {
  return (
    <div className="wrapper">
      <div className="app">
        <div className="header">
          <TabsSelector />
        </div>
      </div>
    </div>
  );
};

export default Grid;
