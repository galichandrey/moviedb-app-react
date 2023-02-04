import React from "react";
import { Space, Spin, Typography } from "antd";
import { parseISO, format } from "date-fns";

import AlertAlarm from "../AlertAlarm";
import PosterImage from "../PosterImage";
import Description from "../Description";
import VoteAverage from "../VoteAverage";
import MovieGenre from "../MovieGenre";
import Rating from "../Rating";

import "./Card.styles.css";

const { Title, Text } = Typography;

export default class Card extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      loading: true,
    };
  }

  onRatingChange = (e) => {
    const { id, rateMovie } = this.props;
    rateMovie(id, e);
  };

  dateConvert(release_date) {
    if (release_date) {
      try {
        return format(parseISO(release_date), "MMMM dd, yyyy");
      } catch (err) {
        this.setState({ hasError: true });
        throw new Error(`Incorrent date format "${err}"`);
      }
    }
    return null;
  }

  componentDidCatch(error, info) {
    this.setState({
      hasError: true,
      error,
      errorInfo: info,
    });
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState(() => {
        return {
          loading: false,
        };
      });
    }, 150);
  }

  render() {
    const { id, original_title, release_date, genre_ids, overview, poster_path, vote_average, rateMovie, rating } =
      this.props;

    const { loading } = this.state;

    const posterPreloader = (
      <div className="card-preloader">
        <Space direction="vertical">
          <Space direction="horizontal">
            <Spin tip="Loading" />
          </Space>
        </Space>
      </div>
    );

    if (this.state.hasError) {
      const { error, errorInfo } = this.state;
      return (
        <AlertAlarm
          error={error ? error : "Error!"}
          errorInfo={errorInfo ? errorInfo : null}
        />
      );
    }

    return (
      <div className="card">
        <div className="cardImage">{loading ? posterPreloader : <PosterImage poster_path={poster_path} />}</div>
        <div className="cardTitleContainer">
          <Title
            level={2}
            className="cardTitle"
            ellipsis={{ ellipsis: false, expandable: false, rows: 2 }}
          >
            {original_title}
            <VoteAverage vote_average={vote_average.toFixed(1)} />
          </Title>
          <Text type="secondary">{release_date ? this.dateConvert(release_date) : null}</Text>
          <MovieGenre
            id={id}
            genre_ids={genre_ids}
            className="MovieGenre"
          />
        </div>
        <div className="cardDescription">
          <Description overview={overview} />
        </div>
        <div className="cardRating">
          <Rating
            id={id}
            rateMovie={rateMovie}
            rating={rating}
            allowClear={false}
          />
        </div>
      </div>
    );
  }
}
