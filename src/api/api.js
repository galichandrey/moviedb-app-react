export default class Api {
  constructor() {
    this.baseUrl = "https://api.themoviedb.org/3";
    this._apiKey = "dc4df0b8fca07bf8f1f87fb1e7fdd71c";
  }

  fetchNewGuestSession = async () => {
    const query = `${this.baseUrl}/authentication/guest_session/new?api_key=${this._apiKey}`;

    const res = await fetch(query)
      .then((data) => data.json())
      .catch((err) => {
        throw new Error(`Received: ${err}`);
      });
    return res.guest_session_id;
  };

  putSessionIdInLocalStorage = (data) => {
    try {
      localStorage.setItem("sessionId", JSON.stringify(data));
    } catch (e) {
      throw Error(e);
    }
  };

  createNewGuestSession = async () => {
    if (JSON.parse(localStorage.getItem("sessionId"))) {
      return;
    }

    const newGuestSession = await this.fetchNewGuestSession();
    this.putSessionIdInLocalStorage(newGuestSession);

    return JSON.parse(localStorage.getItem("sessionId"));
  };

  rateMovie = (movieId, rating) => {
    const ratingData = {
      value: rating,
    };

    let sessionId = JSON.parse(localStorage.getItem("sessionId"));

    if (!sessionId) {
      sessionId = this.createNewGuestSession();
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
        throw new Error(`Received "${err}"`);
      });
  };

  getResource = async (url) => {
    const res = await fetch(`${this.baseUrl}${url}`);
    if (!res.ok) {
      throw new Error(`Could not fetch <<${res.url}>>. Received status: <<${res.status}>>`);
    }
    return res;
  };

  getGenres = async () => {
    try {
      const res = await this.getResource(`/genre/movie/list?api_key=${this._apiKey}`);
      return await res.json();
    } catch (err) {
      throw new Error(`Received "${err}"`);
    }
  };

  getSearchedMovies = async (page = 1, query) => {
    try {
      const res = await this.getResource(`/search/movie?api_key=${this._apiKey}&query=${query}&page=${page}`);
      return await res.json();
    } catch (err) {
      throw new Error(`Received "${err}"`);
    }
  };

  getPopularMovies = async (page = 1) => {
    try {
      const res = await this.getResource(`/movie/popular?api_key=${this._apiKey}&page=${page}`);
      return await res.json();
    } catch (err) {
      throw new Error(`Received "${err}"`);
    }
  };

  getRatedMovies = async (page = 1) => {
    let sessionId = JSON.parse(localStorage.getItem("sessionId"));

    if (!sessionId) {
      try {
        sessionId = await this.createNewGuestSession();
      } catch (err) {
        throw new Error("Guest Session is not received.", err);
      }
    }

    try {
      // eslint-disable-next-line prettier/prettier
      const res = await this.getResource(`/guest_session/${sessionId}/rated/movies?api_key=${this._apiKey}&page=${page}`);
      return await res.json();
    } catch (err) {
      throw new Error(`Received "${err}"`);
    }
  };

  getMoviesWithRating = (promisedArrays) => {
    return this._transformMoviesData(promisedArrays);
  };

  fetchPopularMoviesAndRatingArrays = async (page = 1) => {
    return await Promise.all([this.getPopularMovies(page), this.getRatedMovies()]).catch((err) => {
      throw new Error(`Received "${err}"`);
    });
  };

  fetchSearchedMoviesAndRatingArrays = async (page = 1, query) => {
    if (!query) return;
    return await Promise.all([this.getSearchedMovies(page, query), this.getRatedMovies()]).catch((err) => {
      throw new Error(`Received "${err}"`);
    });
  };

  _transformMoviesData = async (rawArrays) => {
    if (!rawArrays) return;
    const newArrays = await rawArrays.then((data) => {
      return data;
    });

    if (!newArrays) return;

    const [arr1, arr2] = newArrays;

    if (arr2.results.length === 0) {
      return {
        page: arr1.page,
        results: arr1.results,
        total_pages: `${arr1.total_pages > 500 ? 500 : arr1.total_pages}`,
        total_results: `${arr1.total_results > 10000 ? 10000 : arr1.total_results}`,
      };
    }
    const newEmptyArray = arr1.results.map((element) => {
      arr2.results.map((el) => {
        if (element.id === el.id) {
          element.rating = el["rating"];
        }
        return element;
      });
      return element;
    });
    return {
      page: arr1.page,
      results: newEmptyArray,
      total_pages: `${arr1.total_pages > 500 ? 500 : arr1.total_pages}`,
      total_results: `${arr1.total_results > 10000 ? 10000 : arr1.total_results}`,
    };
  };
}
