import React from "react";

import AlertAlarm from "../AlertAlarm";

export default class Api extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      hasError: false,
    };
    this.baseUrl = "https://api.themoviedb.org/3";
    this._apiKey = "dc4df0b8fca07bf8f1f87fb1e7fdd71c";
  }

  async createNewGuestSession() {
    const sessionId = JSON.parse(localStorage.getItem("sessionId"));

    if (sessionId) return sessionId;

    const query = `${this.api.baseUrl}/authentication/guest_session/new?api_key=${this.api._apiKey}`;

    const res = fetch(query)
      .then((data) => data.json())
      .then((data) => {
        if (data.guest_session_id) {
          try {
            localStorage.setItem("sessionId", JSON.stringify(data.guest_session_id));
          } catch (e) {
            throw Error(e);
          }
          if (this.state.sessionId) return;
          this.setState(() => {
            return {
              sessionId: data.guest_session_id,
            };
          });
        }
      })
      .catch((err) => {
        this.setState({
          hasError: true,
          error: err.name,
          errorInfo: err.message,
        });
        throw new Error(`Received: ${err}`);
      });
    return res;
  }

  getCurrentSessionId = () => {
    const sessionIdRaw = localStorage.getItem("sessionId");
    let sessionId = JSON.parse(sessionIdRaw);

    if (!sessionId) {
      sessionId = this.state.sessionId;
    }

    if (!sessionId) {
      return this.api.createNewGuestSession();
    }

    return sessionId;
  };

  rateMovie = (movieId, rating) => {
    const ratingData = {
      value: rating,
    };

    const sessionIdRaw = localStorage.getItem("sessionId");
    let sessionId = JSON.parse(sessionIdRaw);
    if (!sessionId) {
      sessionId = this.api.createNewGuestSession();
    }

    const selectFetch = `${this.baseUrl}/movie/${movieId}/rating?api_key=${this._apiKey}&guest_session_id=${sessionId}`;

    fetch(selectFetch, {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      redirect: "follow",
      referrerPolicy: "no-referrer",
      body: JSON.stringify(ratingData),
    })
      .then((data) => data.json())
      .catch((err) => {
        this.setState({
          hasError: true,
          error: err.name,
          errorInfo: err.message,
        });
        throw new Error(`Received "${err}"`);
      });
  };

  async getResource(url) {
    const res = await fetch(`${this.baseUrl}${url}`);

    if (!res.ok) {
      this.setState({
        hasError: true,
        error: `Could not fetch: ${res.url}`,
        errorInfo: `Received status: ${res.status}`,
      });
      throw new Error(`Could not fetch <<${res.url}>>. Received status: <<${res.status}>>`);
    }
    return await res.json();
  }

  async getSearchedMovies(page = 1, query) {
    if (query) {
      try {
        const res = await this.getResource(`/search/movie?api_key=${this._apiKey}&query=${query}&page=${page}`);
        return res;
      } catch (err) {
        this.setState({
          hasError: true,
          error: err.name,
          errorInfo: err.message,
        });
        throw new Error(`Received "${err}"`);
      }
    }
  }

  async getGenres() {
    try {
      const res = await this.api.getResource(`/genre/movie/list?api_key=${this.api._apiKey}`).then((data) => {
        return data;
      });
      this.setState({
        genres: res,
      });
      return res;
    } catch (err) {
      this.setState({
        hasError: true,
        error: err.name,
        errorInfo: err.message,
      });
      throw new Error(`Received "${err}"`);
    }
  }

  async getPopularMovies(page = 1) {
    try {
      const res = await this.api.getResource(`/movie/popular?api_key=${this.api._apiKey}&page=${page}`);

      return res;
    } catch (err) {
      throw new Error(`Received "${err}"`);
    }
  }

  async getRatedMovies(page = 1) {
    const sessionIdRaw = localStorage.getItem("sessionId");
    let sessionId = JSON.parse(sessionIdRaw);

    if (!sessionId) {
      sessionId = this.state.sessionId;
    }

    if (!sessionId) {
      try {
        sessionId = await this.api.createNewGuestSession();
      } catch (err) {
        throw new Error("Guest Session is not received. Trouble: ", err);
      }
    }

    try {
      if (!sessionId) {
        sessionId = this.state.sessionId;
      }
      const res = await this.api.getResource(
        `/guest_session/${sessionId}/rated/movies?api_key=${this.api._apiKey}&page=${page}`
      );
      return res;
    } catch (err) {
      throw new Error(`Received "${err}"`);
    }
  }

  async getPopularMoviesWithRating(page = 1) {
    Promise.all([await this.api.getPopularMovies(page), await this.api.getRatedMovies()])
      .then(([arr1, arr2]) => {
        const copyOfArray1 = [...arr1.results];
        const newEmptyArray = copyOfArray1.map((element) => {
          arr2.results.map((el) => {
            if (element.id === el["id"]) {
              element.rating = el["rating"];
              return element;
            } else {
              return element;
            }
          });
          return element;
        });
        const returnData = {
          page,
          results: newEmptyArray,
          total_pages: arr1.total_pages,
          total_results: arr1.total_results,
        };
        this.setState(() => {
          return {
            page,
            moviesList: newEmptyArray,
            total_pages: arr1.total_pages,
            total_results: arr1.total_results,
          };
        });
        return returnData;
      })
      .catch((err) => {
        this.setState({
          hasError: true,
          error: err.name,
          errorInfo: err.message,
        });
        throw new Error(`Received "${err}"`);
      });
  }

  async getSearchedMoviesWithRating(page = 1, query) {
    if (!query) return;

    Promise.all([this.api.getSearchedMovies(page, query), this.api.getRatedMovies()])
      .then(([arr1, arr2]) => {
        const copyOfArray1 = [...arr1.results];
        const newEmptyArray = copyOfArray1.map((element) => {
          arr2.results.map((el) => {
            if (element.id === el["id"]) {
              element.rating = el["rating"];
              return element;
            } else {
              return element;
            }
          });
          return element;
        });
        this.setState(() => {
          return {
            page,
            moviesList: newEmptyArray,
            total_pages: arr1.total_pages,
            total_results: arr1.total_results,
          };
        });
      })
      .catch((err) => {
        this.setState({
          hasError: true,
          error: err.name,
          errorInfo: err.message,
        });
        throw new Error(`Received "${err}"`);
      });
  }

  async updatePage(query, pageNumber = 1) {
    const { tab } = this.state;
    if (tab === "rated") {
      this.setState(() => {
        return {
          query: "",
        };
      });
    }

    this.setState(() => {
      return {
        page: pageNumber,
      };
    });

    if ((tab === "search") & query) {
      this.api.getSearchedMoviesWithRating(pageNumber, query);
    } else if ((tab === "search") & !query) {
      this.api.getPopularMoviesWithRating(pageNumber);
    } else if (tab === "rated") {
      const ratedMovies = await this.api.getRatedMovies(pageNumber);
      this.setState(() => {
        return {
          moviesList: ratedMovies.results,
          page: pageNumber,
          total_results: ratedMovies.total_results,
          query: "",
        };
      });
    }
  }

  onPageLoaded = () => {
    this.setState(() => {
      return {
        loading: false,
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

  componentDidMount() {}

  render() {
    if (this.state.hasError) {
      return <AlertAlarm />;
    }
  }
}

Api.propTypes = {
  // bla: PropTypes.string,
};

Api.defaultProps = {
  // bla: 'test',
};
