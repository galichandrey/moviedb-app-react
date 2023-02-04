import React from "react";
import { Typography } from "antd";

const { Text } = Typography;

import "./MovieGenre.styles.css";

import { MovieGenreContext } from "../../context/MovieGenreContext";

class MovieGenre extends React.Component {
  constructor(props) {
    super(props);
  }

  static contextType = MovieGenreContext;

  render() {
    const { genre_ids } = this.props;

    const { genres } = this.context;
    const genreNames = genres.map((element) => {
      for (const genreId of genre_ids) {
        if (element.id === genreId) {
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
