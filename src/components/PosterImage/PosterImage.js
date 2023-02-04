import React from "react";
import { Image } from "antd";

export default class PosterImage extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { poster_path } = this.props;
    const url = "https://image.tmdb.org/t/p/";
    const filesize = "w500";
    const no_image = "/no_image.png";

    return <Image src={poster_path ? `${url}${filesize}${poster_path}` : no_image} />;
  }
}
