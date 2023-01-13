import React, { PureComponent } from "react";
// import PropTypes from "prop-types";
//import { Test } from "./Footer.styles";
import { Pagination } from "antd";

import "../Footer/Footer.styles.css";

class Footer extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      hasError: false,
    };
  }

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>;
    }
    return (
      <div className="FooterWrapper">
        <Pagination
          defaultCurrent={1}
          total={50}
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

export default Footer;
