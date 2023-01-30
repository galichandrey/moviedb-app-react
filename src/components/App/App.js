import React from "react";
import { debounce } from "lodash";
import { Tabs, Space, Spin } from "antd";

import "./App.styles.css";
import Api from "../Api";
import AlertAlarm from "../AlertAlarm";
import Footer from "../Footer";
import CardList from "../CardList";
import SearchArea from "../SearchArea";
import "../CardList/CardList.styles.css";
import { MovieGenreContext } from "../MovieGenre/MovieGenreContext.js";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.api = new Api();

    this.state = {
      hasError: false,
      loading: true,
      tab: "search",
      query: "",
      page: 1,
      genres: "",
      moviesList: [],
      total_pages: "",
      total_results: "",
      items: [
        {
          key: "search",
          label: "Search",
        },
        {
          key: "rated",
          label: "Rated",
        },
      ],
    };
    this.api.createNewGuestSession = this.api.createNewGuestSession.bind(this);
    this.api.updatePage = this.api.updatePage.bind(this);
    this.api.onPageLoaded = this.api.onPageLoaded.bind(this);
    this.api.getRatedMovies = this.api.getRatedMovies.bind(this);
    this.api.getPopularMovies = this.api.getPopularMovies.bind(this);
    this.api.getPopularMoviesWithRating = this.api.getPopularMoviesWithRating.bind(this);
    this.api.getSearchedMoviesWithRating = this.api.getSearchedMoviesWithRating.bind(this);
    this.api.getGenres = this.api.getGenres.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit = (e) => {
    e.preventDefault();
  };

  handleSearchButtonClick = () => {
    this.setState(() => {
      return {
        tab: "search",
      };
    });
  };

  handleRatedButtonClick = () => {
    this.setState(() => {
      return {
        tab: "rated",
      };
    });
  };

  handleChange(e) {
    const queryFromKeyBoard = e.target.value.trim();
    if (!queryFromKeyBoard) {
      return this.api.getPopularMoviesWithRating();
    }

    this.setState(() => {
      return {
        query: e.target.value.trim(),
      };
    });

    this.api.getSearchedMoviesWithRating(1, queryFromKeyBoard);
  }

  onTabChange = (key) => {
    this.setState(() => {
      return {
        tab: key,
        page: 1,
      };
    });
  };

  componentDidCatch(error, info) {
    this.setState({
      hasError: true,
      error,
      errorInfo: info,
    });
  }

  componentDidMount() {
    this.api.createNewGuestSession();
    this.api.getGenres();
    this.setState({
      loading: false,
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.page !== this.state.page) {
      this.api.getSearchedMoviesWithRating(this.state.page, this.state.query);
    }
  }

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

    let { genres } = this.state;
    const rateMovie = this.api.rateMovie;
    const updatePage = this.api.updatePage;
    const { moviesList, query, page, total_results, loading, vote_average, tab } = this.state;
    const debounced = debounce(this.handleChange, 500);

    const Preloader = (
      <Space
        direction="vertical"
        style={{ display: "flex", juctifyContent: "center", alignItems: "center", width: "100%", height: "100%" }}
      >
        <Space
          direction="horizontal"
          style={{ display: "flex", juctifyContent: "center", alignItems: "center", width: "100%", height: "100%" }}
        >
          <Spin tip="Loading" />
        </Space>
      </Space>
    );

    if (loading) {
      return Preloader;
    }

    return (
      <div className="wrapper">
        <div className="app">
          <div className="header">
            <Tabs
              centered
              defaultActiveKey="1"
              items={this.state.items}
              onChange={this.onTabChange}
            />
            {total_results >= 20 ? (
              <div className="wrapperForFooter">
                <Footer
                  query={query}
                  page={page}
                  total_results={total_results}
                  updatePage={updatePage}
                />
              </div>
            ) : null}
            {tab === "search" ? (
              <SearchArea
                handleSubmit={this.handleSubmit}
                handleChange={debounced}
              />
            ) : null}
          </div>
          <div className="CardList">
            <MovieGenreContext.Provider value={genres}>
              <CardList
                moviesList={moviesList}
                query={query}
                page={page}
                loading={loading}
                updatePage={updatePage}
                rateMovie={rateMovie}
                vote_average={vote_average}
                tab={tab}
              />
            </MovieGenreContext.Provider>
          </div>
          {total_results >= 20 ? (
            <div className="wrapperForFooter">
              <Footer
                query={query}
                page={page}
                total_results={total_results}
                updatePage={updatePage}
              />
            </div>
          ) : null}
        </div>
      </div>
    );
  }
}
