import React, { Component } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import Team from "../components/sections/Team";
import { selectConsultant } from "../redux/consultants/consultantsSelectors";

class DoctorsAndCounselors extends Component {
  render() {
    const { consultants } = this.props;
    return (
      <React.Fragment>
        <Team teams={consultants} isHomePage={false} />
      </React.Fragment>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  consultants: selectConsultant,
});

export default connect(mapStateToProps, {})(DoctorsAndCounselors);
