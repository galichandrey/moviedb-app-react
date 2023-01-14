import React from "react";
// import PropTypes from "prop-types";
//import { Test } from "./Api.styles";

export default class Api extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      hasError: false,
    };
    this._apiBase = "https://api.themoviedb.org/3/search/movie/";
    this._apiKey = "dc4df0b8fca07bf8f1f87fb1e7fdd71c";
    this.getMovies = this.getMovies.bind(this);
    this.getResource = this.getResource.bind(this);
  }

  async getResource(query) {
    // eslint-disable-next-line no-undef
    const res = await fetch(`${this._apiBase}?api_key=${this._apiKey}&${query}`);

    if (!res.ok) {
      // eslint-disable-next-line no-undef
      throw new Error(`Could not fetch ${url}, received ${res.status}`);
    }
    return await res.json();
  }

  async getMovies(query) {
    const res = await this.getResource(`query=${query}`);
    return res.results;
  }
}

Api.propTypes = {
  // bla: PropTypes.string,
};

Api.defaultProps = {
  // bla: 'test',
};
