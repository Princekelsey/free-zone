import React, { Component } from "react";

class Title extends Component {
  render() {
    return (
      <div className={"chatApp__convTitle"}>{this.props.owner}'s display</div>
    );
  }
}

export default Title;
