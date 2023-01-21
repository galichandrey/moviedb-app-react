import React, { Component } from "react";
// import PropTypes from "prop-types";
// import { Spin } from "antd";
import "./TabSearch.styles.css";

import AlertAlarm from "../AlertAlarm";
import CardList from "../CardList";

class TabSearch extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hasError: false,
      loading: true,
    };
  }

  componentDidMount() {
    this.setState(() => {
      return { loading: false };
    });
    console.log("TabSearch - componentDidMount");
  }

  componentDidUpdate(prevProps, prevState) {
    const { moviesList } = this.props;
    if (!moviesList) {
      return <div>No movies found. Please, try another movie</div>;
    }

    if (prevProps.query !== this.props.query) {
      console.log("TabSearch QUERY props are changed!");
    }
    if (prevState.query !== this.state.query) {
      console.log("State", this.state.query);
    }
  }

  render() {
    const { errorMessage } = this.props;
    const { moviesList, query, page, updatePage } = this.props;
    const { loading } = this.props;

    // console.log(loading);
    // if (loading) {
    //   return <Spin />;
    // }

    // const spinner = loading ? <Spin /> : null;

    if (this.props.errorMessage) {
      return <AlertAlarm errorMessage={errorMessage} />;
    }
    return (
      <>
        <div className="wrapperForTabSearch">
          <div className="wrapperForMain">
            {/* {spinner} */}
            <CardList
              moviesList={moviesList}
              query={query}
              page={page}
              updatePage={updatePage}
              loading={loading}
            />
          </div>
        </div>
      </>
    );
  }
}

TabSearch.propTypes = {
  // bla: PropTypes.string,
};

TabSearch.defaultProps = {
  // bla: 'test',
};

export default TabSearch;
