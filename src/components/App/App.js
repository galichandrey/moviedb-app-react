import React from "react";
import { debounce } from "lodash";
import { Space, Spin } from "antd";

import SearchArea from "../SearchArea";
import CardList from "../CardList";
import Footer from "../Footer";
import "./App.styles.css";
import "../CardList/CardList.styles.css";

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      hasError: false,
      moviesList: [],
      query: "",
      page: 1,
      total_results: "",
      loading: true,
    };
    this.onPageLoaded = this.onPageLoaded.bind(this);
    this.updatePage = this.updatePage.bind(this);
  }

  componentDidMount() {
    this.setState({
      loading: false,
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.page !== this.state.page) {
      // console.log(this.state.page);
    }
    if (prevProps.page !== this.props.page) {
      // console.log("Пропс page поменялся с прошлого раза");
    }
  }

  onError(err) {
    this.setState({ hasError: true, errorMessage: err });
  }

  onPageLoaded() {
    this.setState({
      loading: false,
    });
  }

  // onNoMoviesFound() {

  // }

  updatePage(query, pageNumber = 1) {
    let selectFetch;
    if (query) {
      selectFetch = `https://api.themoviedb.org/3/search/movie?api_key=dc4df0b8fca07bf8f1f87fb1e7fdd71c&query=${query}&page=${pageNumber}`;
    } else {
      selectFetch = `https://api.themoviedb.org/3/movie/popular?api_key=dc4df0b8fca07bf8f1f87fb1e7fdd71c&page=${pageNumber}`;
    }
    fetch(selectFetch)
      .then((data) => data.json())
      .then((data) => {
        // console.log(data.results);
        this.setState(() => {
          if (data.total_results) {
            // console.log(data.results);
            return {
              moviesList: [...data.results],
              page: pageNumber,
              total_results: data.total_results,
            };
          } else {
            // console.log("there's no data.results ", data.results);
            return {
              moviesList: [],
              page: pageNumber,
              total_results: 0,
            };
          }
        });
      })
      .then(this.onPageLoaded())
      .catch((e) => {
        throw Error(e);
      });
  }

  handleSubmit = (e) => {
    e.preventDefault();
  };

  handleChange = (e) => {
    this.setState(() => {
      return { query: e.target.value.trim() };
    });
    const queryFromKeyBoard = e.target.value.trim();
    const { page } = this.state;
    this.updatePage(queryFromKeyBoard, page);
  };

  render() {
    const { moviesList, query, page, total_results, loading } = this.state;
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
            <div className="wrapperForFooter">
              <Footer
                query={query}
                page={page}
                total_results={total_results}
                updatePage={this.updatePage}
              />
            </div>
            <SearchArea
              handleSubmit={this.handleSubmit}
              handleChange={debounced}
            />
          </div>
          <div className="CardList">
            <CardList
              moviesList={moviesList}
              query={query}
              page={page}
              loading={loading}
              updatePage={this.updatePage}
            />
          </div>
        </div>
      </div>
    );
  }
}
