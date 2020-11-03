import React, { Component } from "react";
import Team from "../components/sections/Team";
import { teamsData } from "../utils/data";

class DoctorsAndCounselors extends Component {
  render() {
    return (
      <React.Fragment>
        <Team teams={teamsData} isHomePage={false} />
      </React.Fragment>
    );
  }
}

export default DoctorsAndCounselors;
