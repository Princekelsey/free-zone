import React, { Component } from "react";
import Team from "../components/sections/Team";
import { teamsData } from "../utils/data";

class DoctorsAndCounselors extends Component {
  state = {
    isTop: false,
  };
  componentDidMount() {
    if (
      window.pageYOffset > 400 &&
      this.props.location.pathname === "/doctors-counselors"
    ) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  scrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  render() {
    console.log(this.props.location.pathname);
    return (
      <React.Fragment>
        <Team teams={teamsData} isHomePage={false} />
      </React.Fragment>
    );
  }
}

export default DoctorsAndCounselors;
