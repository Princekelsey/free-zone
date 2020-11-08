import React, { Component } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import Team from "../components/sections/Team";
import { selectConsultant } from "../redux/consultants/consultantsSelectors";

class DoctorsAndCounselors extends Component {
  componentDidMount() {
    this.props.setCurrentLocation(this.props.location.pathname);
  }
  render() {
    const { consultants } = this.props;
    return (
      <React.Fragment>
        <Team
          teams={consultants}
          isHomePage={false}
          className="illustration-section-01"
        />
      </React.Fragment>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  consultants: selectConsultant,
});

export default connect(mapStateToProps, {})(DoctorsAndCounselors);
