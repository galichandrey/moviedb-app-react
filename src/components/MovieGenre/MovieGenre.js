import React from "react";
import { Typography } from "antd";

const { Text } = Typography;

import "./MovieGenre.styles.css";

import { MovieGenreContext } from "./MovieGenreContext";

class MovieGenre extends React.Component {
  constructor() {
    super();
  }

  static contextType = MovieGenreContext;

  render() {
    const { genre_ids } = this.props;

    const { genres } = this.context;

    const genreNames = genres.map((element) => {
      for (let i = 0; i < genre_ids.length; i++) {
        if (element.id === genre_ids[i]) {
          return (
            <Text
              code
              key={element.name}
              className="MovieGenre"
            >
              {element.name}
            </Text>
          );
        }
      }
    });

    return <div className="MovieGenresContainer">{genreNames}</div>;
  }
}

export default MovieGenre;
