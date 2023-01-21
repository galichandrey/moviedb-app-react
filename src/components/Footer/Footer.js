import React from "react";
// import PropTypes from "prop-types";
//import { Test } from "./Footer.styles";
import { Pagination } from "antd";

import "../Footer/Footer.styles.css";

export default class Footer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      hasError: false,
    };
  }

  handlePaginationOnChange = (paginationPageNumber) => {
    const { updatePage, query } = this.props;
    updatePage(query, paginationPageNumber);
  };

  render() {
    const { page, total_results } = this.props;
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>;
    }
    return (
      <div className="FooterWrapper">
        <Pagination
          defaultCurrent={1}
          total={total_results ? total_results : null}
          current={page}
          pageSize={20}
          onChange={this.handlePaginationOnChange}
          hideOnSinglePage="true"
        />
      </div>
    );
  }
}

Footer.propTypes = {
  // bla: PropTypes.string,
};

Footer.defaultProps = {
  // bla: 'test',
};
