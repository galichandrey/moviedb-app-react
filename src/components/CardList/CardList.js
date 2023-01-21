import React from "react";
// import PropTypes from "prop-types";
//import { Test } from "./Main.styles";
import "./CardList.styles.css";

import Card from "../Card";
import AlertAlarm from "../AlertAlarm";

export default class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // hasError: false,
      errorMessage: null,
      loading: true,
    };
  }

  componentDidMount() {
    const { query, page, updatePage } = this.props;
    updatePage(query, page);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.page !== this.props.page) {
      // console.log("CardList - updated", this.props.query);
    }
    if (prevState.page !== this.state.page) {
      // console.log("State (loading)", this.state.loading);
    }
  }

  renderCards = (movieArray) => {
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
  };

  render() {
    const { errorMessage } = this.state;
    const { query, moviesList } = this.props;

    if (errorMessage) {
      return <AlertAlarm errorMessage={errorMessage} />;
    }

    const cards = this.renderCards(moviesList);
    if ((moviesList.length === 0) & (query.length > 0)) {
      return <div>No movies found. Please, try another movie</div>;
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
