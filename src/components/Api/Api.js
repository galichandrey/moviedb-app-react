import React from "react";

// import PropTypes from "prop-types";
//import { Test } from "./Api.styles";
// import AlertAlarm from "../AlertAlarm";

export default class Api extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      hasError: false,
    };
    this._urlBase = "https://api.themoviedb.org/3/search/movies";
    this._apiKey = "dc4df0b8fca07bf8f1f87fb1e7fdd71c";
    this.getMovies = this.getMovies.bind(this);
    this.getResource = this.getResource.bind(this);
  }

  async getResource(query) {
    // eslint-disable-next-line no-undef
    const res = await fetch(`${this._urlBase}?api_key=${this._apiKey}&${query}`);

    if (!res.ok) {
      // eslint-disable-next-line no-undef
      throw new Error(`Could not fetch <<${query}>>. Received status: <<${res.status}>>`);
    }
    return await res.json();
  }

  async getMovies(query, page = 1) {
    try {
      const res = await this.getResource(`query=${query}&page=${page}`);
      return res.results;
    } catch (err) {
      throw new Error(`Received "${err}".`);
    }
  }

  // onPageLoaded = () => {
  //   this.setState(() => {
  //     return {
  //       loading: false,
  //     };
  //   });
  // };

  onPageLoaded = () => {
    this.setState({
      loading: false,
    });
  };

  updatePage = (query, pageNumber) => {
    console.log("updatePage - clicked");
    // const { query } = this.state;
    fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=dc4df0b8fca07bf8f1f87fb1e7fdd71c&query=${query}&page=${pageNumber}`
    )
      .then((data) => data.json())
      .then((data) => {
        console.log(data.results);
        this.setState(() => {
          console.log(data.total_results);
          return {
            moviesList: [...data.results],
            page: pageNumber,
            total_results: data.total_results,
          };
        });
      })
      .then(() => {
        console.log("then before onPageLoaded");
        this.onPageLoaded();
      })
      .catch((e) => {
        throw Error(e);
      });
  };

  updatePopular = (pageNumber = 1) => {
    fetch(`https://api.themoviedb.org/3/movie/popular?api_key=dc4df0b8fca07bf8f1f87fb1e7fdd71c&page=${pageNumber}`)
      .then((data) => data.json())
      .then((data) => {
        // console.log(data.results);
        this.setState(() => {
          // console.log(data.total_results);
          return {
            moviesList: [...data.results],
            page: pageNumber,
            total_results: data.total_results,
          };
        });
      })
      .then(this.onPageLoaded())
      .catch((e) => {
        throw Error(e);
      });
  };
}

Api.propTypes = {
  // bla: PropTypes.string,
};

Api.defaultProps = {
  // bla: 'test',
};
