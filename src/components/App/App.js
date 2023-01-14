import React from "react";

// eslint-disable-next-line import/order
import TabsSelector from "../TabsSelector";

// import Main from "../Main";

import "./App.styles.css";
// import Card from "../Card";

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      hasError: false,
      // query: "return",
    };
  }
  render() {
    return (
      <div className="wrapper">
        <div className="app">
          <div className="header">
            <TabsSelector />
          </div>
          <div className="foot">{/* <Api query={query} /> */}</div>
        </div>
      </div>
    );
  }
}
