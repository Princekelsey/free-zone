import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import HeroSplit from "../components/sections/HeroSplit";
import FeaturesTiles from "../components/sections/FeaturesTiles";
import FeaturesTabs from "../components/sections/FeaturesTabs";
import News from "../components/sections/News";
import Roadmap from "../components/sections/Roadmap";
import Pricing from "../components/sections/Pricing";
import Cta from "../components/sections/Cta";
import FeaturesSplit from "../components/sections/FeaturesSplit";
import Team from "../components/sections/Team";
import { selectConsultant } from "../redux/consultants/consultantsSelectors";

class Home extends React.Component {
  componentDidMount() {
    this.props.setCurrentLocation(this.props.location.pathname);
  }
  render() {
    const { consultants } = this.props;
    const teams = consultants.slice(0, 3);
    return (
      <React.Fragment>
        <HeroSplit hasBgColor invertColor />
        {/* <FeaturesTiles />
        <FeaturesTabs topDivider bottomOuterDivider isMain />
        <News className="illustration-section-01" />
        <Roadmap topOuterDivider />
        <Pricing hasBgColor pricingSlider />
        <Cta hasBgColor invertColor split /> */}
        <FeaturesSplit invertMobile imageFill />
        <Team topDivider teams={teams} isHomePage={true} />
        <News className="illustration-section-01" />
        <Cta hasBgColor invertColor split />
      </React.Fragment>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  consultants: selectConsultant,
});

export default connect(mapStateToProps, {})(Home);
