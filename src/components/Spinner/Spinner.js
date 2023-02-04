import React from "react";
import { Space, Spin } from "antd";

class Spinner extends React.Component {
  constructor() {
    super();

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

export default Spinner;
