import React, { Component } from "react";

import "./VoteAverage.styles.css";

class VoteAverage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hasError: false,
    };
  }

  render() {
    const { vote_average } = this.props;

    let borderColor;
    if ((vote_average >= 0) & (vote_average < 3)) {
      borderColor = "#E90000";
    } else if ((vote_average >= 3) & (vote_average < 5)) {
      borderColor = "#E97E00";
    } else if ((vote_average >= 5) & (vote_average < 7)) {
      borderColor = "#E9D100";
    } else if (vote_average >= 7) {
      borderColor = "#66E900";
    }

    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>;
    }
    return (
      <div
        className="VoteAverage"
        style={{ border: `2px solid ${borderColor}` }}
      >
        {vote_average}
      </div>
    );
  }
}

export default VoteAverage;
