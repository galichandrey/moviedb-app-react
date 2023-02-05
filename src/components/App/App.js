import React from "react";
import { debounce } from "lodash";
import { Tabs } from "antd";

import "./App.styles.css";
import "../CardList/CardList.styles.css";
import Api from "../../api/";
import AlertAlarm from "../AlertAlarm";
import Footer from "../Footer";
import CardList from "../CardList";
import SearchArea from "../SearchArea";
import { MovieGenreContext } from "../../context/MovieGenreContext";

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
  }

  handleSubmit = (e) => {
    e.preventDefault();
  };

  handleChange = (e) => {
    const queryFromKeyBoard = e.target.value.trim();
    this.setState(() => {
      return {
        query: e.target.value.trim(),
        page: 1,
      };
    });
    if (!queryFromKeyBoard) {
      this.setState({
        query: "",
        page: 1,
      });
    }
  };

  onTabChange = (key) => {
    this.setState(() => {
      return {
        tab: key,
        page: 1,
      };
    });
  };

  updateGenres = async () => {
    this.api.getGenres().then(this.onGenresLoaded).catch(this.onError);
  };

  onGenresLoaded = (genres) => {
    this.setState(() => {
      return {
        genres,
        loading: false,
        hasError: false,
      };
    });
  };

  onMoviesLoaded = (moviesData) => {
    const { page, total_pages, total_results } = moviesData;
    this.setState(() => {
      return {
        page,
        moviesList: moviesData,
        total_pages,
        total_results,
        loading: false,
        hasError: false,
      };
    });
  };

  onError = (err) => {
    this.setState({
      hasError: true,
      error: err.name,
      errorInfo: err.message,
    });
  };

  updatePage = (query = "", pageNumber = 1) => {
    this.setState({
      loading: true,
    });

    const { tab = "search" } = this.state;

    if (tab === "rated") {
      this.setState({
        query: "",
      });
      this.api.fetchAllRatedMovies(pageNumber).then(this.onMoviesLoaded).catch(this.onError);
    } else if (query) {
      const data = this.api.fetchSearchedMoviesAndRatingArrays(pageNumber, query);
      this.api.getMoviesWithRating(data).then(this.onMoviesLoaded).catch(this.onError);
    } else if (!query) {
      const data = this.api.fetchPopularMoviesAndRatingArrays(pageNumber);
      this.api.getMoviesWithRating(data).then(this.onMoviesLoaded).catch(this.onError);
    }
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
    this.updateGenres();
    this.setState({
      loading: false,
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.query !== prevState.query) {
      const { query, page } = this.state;
      this.updatePage(query, page);
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
    const { moviesList, query, page, total_results, loading, vote_average, tab } = this.state;
    const debounced = debounce(this.handleChange, 500);

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
            {total_results >= 6 ? (
              <div className="wrapperForFooter">
                <Footer
                  query={query}
                  page={page}
                  total_results={total_results}
                  updatePage={this.updatePage}
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
                updatePage={this.updatePage}
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
                updatePage={this.updatePage}
              />
            </div>
          ) : null}
        </div>
      </div>
    );
  }
}
