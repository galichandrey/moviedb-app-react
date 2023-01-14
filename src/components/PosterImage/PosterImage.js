import React from "react";
import { Image } from "antd";

export default class PosterImage extends React.Component {
  render() {
    const { poster_path } = this.props;
    const url = "https://image.tmdb.org/t/p/";
    const filesize = "w500";
    return (
      <Image
        width={183}
        // height={281}
        src={`${url}${filesize}${poster_path}`}
      />
    );
  }
}
