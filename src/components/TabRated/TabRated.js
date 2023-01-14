import React, { Component } from "react";
// import PropTypes from "prop-types";
//import { Test } from "./TabSearch.styles";
// import { Input } from "antd";

import CardList from "../CardList";

class TabSearch extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hasError: false,
    };
  }

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>;
    }
    return (
      <>
        <div className="wrapperForTabRated">
          <div className="wrapperForMain">
            <CardList />
          </div>
        </div>
      </>
    );
  }
}

TabSearch.propTypes = {
  // bla: PropTypes.string,
};

TabSearch.defaultProps = {
  // bla: 'test',
};

export default TabSearch;
