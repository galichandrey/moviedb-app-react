import React from "react";
import { Typography } from "antd";

import "./Description.styles.css";

const { Paragraph } = Typography;

export default class Description extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { overview } = this.props;
    return (
      <Paragraph
        className="description"
        ellipsis={{ ellipsis: false, expandable: false, rows: 5 }}
      >
        {overview}
      </Paragraph>
    );
  }
}
