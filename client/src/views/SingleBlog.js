import React, { Component } from "react";
import NewsDetails from "../components/sections/NewsDetails";
import { newsData } from "../utils/data";

class SingleBlog extends Component {
  state = {
    blogDetails: null,
  };
  componentDidMount() {
    this.props.setCurrentLocation(this.props.location.pathname);
    const details = newsData.find(
      (data) => data.id === this.props.match.params.id
    );
    this.setState({ blogDetails: details });
  }
  render() {
    return (
      <>
        {this.state.blogDetails && (
          <NewsDetails blogDetails={this.state.blogDetails} />
        )}
      </>
    );
  }
}

export default SingleBlog;
