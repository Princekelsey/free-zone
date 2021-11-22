import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import HeroSplit from "../components/sections/HeroSplit";
import News from "../components/sections/News";
import FeaturesSplit from "../components/sections/FeaturesSplit";
import Team from "../components/sections/Team";
import { selectConsultant } from "../redux/consultants/consultantsSelectors";
import { newsData } from "../utils/data";
import { loadProgressBar } from "axios-progress-bar";

class Home extends React.Component {
  componentDidMount() {
    loadProgressBar();
    this.props.setCurrentLocation(this.props.location.pathname);
  }
  render() {
    const { consultants } = this.props;
    const teams = consultants.slice(0, 3);
    const blogs = newsData.slice(0, 3);
    return (
      <React.Fragment>
        <HeroSplit hasBgColor invertColor />
        <FeaturesSplit invertMobile imageFill />
        <Team topDivider teams={teams} isHomePage={true} />
        <News className="illustration-section-01" blogs={blogs} />
      </React.Fragment>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  consultants: selectConsultant,
});

export default connect(mapStateToProps, {})(Home);
