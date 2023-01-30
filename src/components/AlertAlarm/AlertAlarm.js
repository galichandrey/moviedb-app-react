import React from "react";
import { Alert } from "antd";

export default class AlertAlarm extends React.Component {
  render() {
    const { error, errorInfo } = this.props;
    return (
      <Alert
        message={error ? error : "Error!"}
        description={errorInfo ? `${errorInfo} Please, refresh page...` : "Error occurred! Please, refresh page..."}
        type="error"
        showIcon
        closable
      />
    );
  }
}
