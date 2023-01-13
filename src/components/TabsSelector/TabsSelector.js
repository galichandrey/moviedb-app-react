import React from "react";
import { Tabs } from "antd";

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

const TabsSelector = () => (
  <Tabs
    centered
    defaultActiveKey="1"
    items={items}
    onChange={onChange}
    className="TabsSelector"
  />
);

export default TabsSelector;
