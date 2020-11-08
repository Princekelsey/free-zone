import React, { Component } from "react";
import Chat from "../components/sections/chat/Chat";

class Arena extends Component {
  componentDidMount() {
    this.props.setCurrentLocation(this.props.location.pathname);
  }
  render() {
    return <Chat />;
  }
}

export default Arena;
