import React from "react";
import { Alert, Space } from "antd";

export default class AlertAlarm extends React.Component {
  // onClose(e) {
  //   console.log(e, "I was closed.");
  // }

  render() {
    const { errorMessage } = this.props;
    return (
      <Space
        direction="vertical"
        style={{ width: "100%" }}
      >
        <Alert
          message="Error"
          description={`${errorMessage.message} Please, try again later`}
          type="error"
          showIcon
          closable
          // onClose={this.onClose}
        />
      </Space>
    );
  }
}
