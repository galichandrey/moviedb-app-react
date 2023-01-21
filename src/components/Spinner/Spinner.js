import React from "react";
// import PropTypes from "prop-types";
//import { Test } from "./Spinner.styles";
import { Space, Spin } from "antd";

class Spinner extends React.Component {
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
      <Space
        direction="vertical"
        style={{ display: "flex", juctifyContent: "center", alignItems: "center", width: "100%" }}
      >
        <Space direction="horizontal">
          <Spin tip="Loading" />
        </Space>
      </Space>
    );
  }
}

Spinner.propTypes = {
  // bla: PropTypes.string,
};

Spinner.defaultProps = {
  // bla: 'test',
};

export default Spinner;
