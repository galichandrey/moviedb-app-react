import React from "react";
import { Tabs, Spin } from "antd";

// import Main from "../Main";
import TabSearch from "../TabSearch";
import TabRated from "../TabRated";
import "./TabsSelector.styles.css";

const onChange = (key) => {
  console.log(key);
};

const items = [
  {
    key: "1",
    label: "Search",
    children: <TabSearch />,
  },
  {
    key: "2",
    label: "Rated",
    children: <TabRated />,
  },
];

export default class TabsSelector extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      hasError: false,
      loading: true,
    };
  }

  render() {
    const { loading } = this.state;

    if (!loading) {
      console.log(loading);
      return <Spin />;
    }
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>;
    }
    return (
      <Tabs
        centered
        defaultActiveKey="1"
        items={items}
        onChange={onChange}
        className="TabsSelector"
      />
    );
  }
}
