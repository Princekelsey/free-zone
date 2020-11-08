import React, { Component } from "react";
import NewsDetails from "../components/sections/NewsDetails";

class SingleBlog extends Component {
  componentDidMount() {
    this.props.setCurrentLocation(this.props.location.pathname);
  }
  render() {
    return <NewsDetails />;
  }
}

export default SingleBlog;
