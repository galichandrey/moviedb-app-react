import React from "react";
import { Input } from "antd";

class SearchArea extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      hasError: false,
    };
  }

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
  }
}

SearchArea.propTypes = {};

SearchArea.defaultProps = {};

export default SearchArea;
