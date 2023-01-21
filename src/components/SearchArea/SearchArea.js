import React from "react";
// import PropTypes from "prop-types";
//import { Test } from "./SearchArea.styles";
import { Input } from "antd";

class SearchArea extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      hasError: false,
    };
  }

  // componentDidMount() {
  //   console.log("SearchArea mounted");
  // }

  // componentUpdate() {
  //   console.log("SearchArea updated");
  // }

  render() {
    const { handleSubmit, handleChange } = this.props;
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>;
    }
    return (
      <div className="wrapperForInput">
        <form onSubmit={handleSubmit}>
          <Input
            placeholder="Basic usage"
            onChange={handleChange}
          />
        </form>
      </div>
    );
    // <div className="SearchAreaWrapper">Test content</div>;
  }
}

SearchArea.propTypes = {
  // bla: PropTypes.string,
};

SearchArea.defaultProps = {
  // bla: 'test',
};

export default SearchArea;
