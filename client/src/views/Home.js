import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import HeroSplit from "../components/sections/HeroSplit";
import News from "../components/sections/News";
import Cta from "../components/sections/Cta";
import FeaturesSplit from "../components/sections/FeaturesSplit";
import Team from "../components/sections/Team";
import { selectConsultant } from "../redux/consultants/consultantsSelectors";
import { newsData } from "../utils/data";

class Home extends React.Component {
  componentDidMount() {
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
        <Cta hasBgColor invertColor split />
      </React.Fragment>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  consultants: selectConsultant,
});

export default connect(mapStateToProps, {})(Home);
