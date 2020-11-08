import React, { Component } from "react";
import Pricing from "../components/sections/Pricing";

class Store extends Component {
  componentDidMount() {
    this.props.setCurrentLocation(this.props.location.pathname);
  }
  render() {
    return <Pricing hasBgColor className="illustration-section-01" />;
  }
}
export default Store;
