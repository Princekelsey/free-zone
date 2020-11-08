import React, { Component } from "react";
import News from "../components/sections/News";

class Blogs extends Component {
  componentDidMount() {
    this.props.setCurrentLocation(this.props.location.pathname);
  }

  render() {
    return (
      <News className="has-bg-color-cut illustration-section-02" fullPage />
    );
  }
}

export default Blogs;
