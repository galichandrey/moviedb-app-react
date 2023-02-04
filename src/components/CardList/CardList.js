import React from "react";
import { Space, Spin } from "antd";

import "./CardList.styles.css";
import Card from "../Card";
import AlertAlarm from "../AlertAlarm";

export default class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
      loading: true,
    };
  }

  componentDidCatch(error, info) {
    this.setState({
      hasError: true,
      error,
      errorInfo: info,
    });
  }

  componentDidMount() {
    this.setState(() => {
      return {
        loading: false,
      };
    });
    const { query, page, updatePage } = this.props;
    updatePage(query, page);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.tab !== this.props.tab) {
      const { query, page, updatePage } = this.props;
      updatePage(query, page);
    }

    if (prevProps.query !== this.props.query) {
      const { query, page, updatePage } = this.props;
      updatePage(query, page);
    }

    if (prevProps.page !== this.props.page) {
      const { query, page, updatePage } = this.props;
      updatePage(query, page);
    }
  }

  renderCards = (movieArray) => {
    const { rateMovie } = this.props;
    if (!movieArray.results) return;
    return movieArray.results.map(
      ({ id, original_title, release_date, genre_ids, overview, poster_path, vote_average, rating }) => {
        return (
          <Card
            key={id}
            id={id}
            original_title={original_title}
            release_date={release_date}
            genre_ids={genre_ids}
            overview={overview}
            poster_path={poster_path}
            rateMovie={rateMovie}
            vote_average={vote_average}
            rating={rating}
          />
        );
      }
    );
  };

  render() {
    if (this.state.hasError) {
      const { error, errorInfo } = this.state;
      return (
        <AlertAlarm
          error={error}
          errorInfo={errorInfo ? errorInfo : null}
        />
      );
    }

    const { loading } = this.props;
    // const { query } = this.props;

    const cardListPreloader = (
      <div className="cardList-preloader">
        <Space direction="vertical">
          <Space direction="horizontal">
            <Spin tip="Loading" />
          </Space>
        </Space>
      </div>
    );

    const { moviesList } = this.props;

    const cards = this.renderCards(moviesList);
    if (!loading & (typeof moviesList.results === "object")) {
      if (moviesList.results.length === 0) {
        return <div>No movies found. Please, try another movie</div>;
      }
    }

    return (
      <div className={loading ? null : "main"}>
        {loading ? cardListPreloader : null}
        {/* {cards} */}
        {loading ? null : cards}
        {/* {!loading & !cards ? null : <div>No movies found. Please, try another movie</div>} */}
      </div>
    );
  }
}

Main.propTypes = {};

Main.defaultProps = {};
