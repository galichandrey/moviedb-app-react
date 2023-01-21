import React from "react";
import { Tabs, Spin } from "antd";

// import Main from "../Main";
import TabSearch from "../TabSearch";
import TabRated from "../TabRated";
import "./TabsSelector.styles.css";
import AlertAlarm from "../AlertAlarm";

const onChange = (key) => {
  console.log(key);
};

export default class TabsSelector extends React.Component {
  constructor(props) {
    super(props);
    const query = this.props.query;
    const page = this.props.page;
    const moviesList = this.props.moviesList;
    this.state = {
      hasError: false,
      loading: true,
      moviesList,
      items: [
        {
          key: "1",
          label: "Search",
          children: (
            <TabSearch
              moviesList={moviesList}
              query={query}
              page={page}
            />
          ),
        },
        {
          key: "2",
          label: "Rated",
          children: <TabRated />,
        },
      ],
    };
  }

  componentDidMount() {
    this.setState({ moviesList: this.props.moviesList });
    console.log(this.state);
  }

  render() {
    const { loading, items } = this.state;

    if (!loading) {
      console.log(loading);
      return <Spin />;
    }
    if (this.props.errorMessage) {
      const { errorMessage } = this.props.errorMessage;
      return <AlertAlarm errorMessage={errorMessage} />;
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
