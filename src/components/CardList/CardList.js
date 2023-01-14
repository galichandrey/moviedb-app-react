import React from "react";
import { Space, Spin } from "antd";
// import PropTypes from "prop-types";
//import { Test } from "./Main.styles";

import Api from "../Api";
import Card from "../Card";

export default class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      moviesList: null,
    };
    this.renderCards = this.renderCards.bind(this);
  }

  componentDidMount() {
    const api = new Api();
    return api.getMovies("return").then((moviesList) => {
      this.setState({
        moviesList,
      });
    });
  }

  renderCards(movieArray) {
    return movieArray.map(({ id, original_title, release_date, overview, poster_path }) => {
      return (
        <Card
          key={id}
          original_title={original_title}
          release_date={release_date}
          overview={overview}
          poster_path={poster_path}
        />
      );
    });
  }

  render() {
    const { moviesList } = this.state;
    if (!moviesList) {
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
    const cards = this.renderCards(moviesList);

    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>;
    }
    return <div className="main">{cards}</div>;
  }
}

Main.propTypes = {
  // bla: PropTypes.string,
};

Main.defaultProps = {
  // bla: 'test',
};
