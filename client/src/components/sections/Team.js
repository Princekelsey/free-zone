import React from "react";
import { Link } from "react-router-dom";
import classNames from "classnames";
import { SectionTilesProps } from "../../utils/SectionProps";
import SectionHeader from "./partials/SectionHeader";
import Image from "../elements/Image";
import Button from "../elements/Button";

const propTypes = {
  ...SectionTilesProps.types,
};

const defaultProps = {
  ...SectionTilesProps.defaults,
};

class Team extends React.Component {
  render() {
    const {
      className,
      topOuterDivider,
      bottomOuterDivider,
      topDivider,
      bottomDivider,
      hasBgColor,
      invertColor,
      pushLeft,
      isHomePage,
      teams,
      ...props
    } = this.props;

    const outerClasses = classNames(
      "team section center-content",
      topOuterDivider && "has-top-divider",
      bottomOuterDivider && "has-bottom-divider",
      hasBgColor && "has-bg-color",
      invertColor && "invert-color",
      className
    );

    const innerClasses = classNames(
      "team-inner section-inner",
      topDivider && "has-top-divider",
      bottomDivider && "has-bottom-divider"
    );

    const tilesClasses = classNames("tiles-wrap", pushLeft && "push-left");

    const sectionHeader = {
      title: "Get To Know Our Doctors And Counselors",
      paragraph: "Meet our certified and dedicated doctors and counselors  ",
    };

    return (
      <section {...props} className={outerClasses}>
        <div className="container">
          <div className={innerClasses}>
            <SectionHeader
              data={sectionHeader}
              className="center-content reveal-from-bottom"
            />
            <div className={tilesClasses}>
              {teams.map((teamMember) => (
                <div
                  className="tiles-item reveal-from-bottom"
                  data-reveal-container=".tiles-wrap"
                  key={teamMember.id}
                >
                  <div className="tiles-item-inner">
                    <div className="team-item-header">
                      <div className="team-item-image mb-24">
                        <Image
                          src={require(`./../../assets/images/${teamMember.image}`)}
                          alt={teamMember.name}
                          width={180}
                          height={180}
                        />
                      </div>
                    </div>
                    <div className="team-item-content">
                      <h5 className="team-item-name mt-0 mb-4">
                        {teamMember.name}
                      </h5>
                      <div className="team-item-role text-xs fw-600 mb-8">
                        {teamMember.title}
                      </div>
                      <p className="m-0 text-sm">{teamMember.info}</p>
                      <Button
                        tag={Link}
                        color="dark"
                        to={`/chat/${teamMember.id}/`}
                        wideMobile
                        size="sm"
                        className="mt-4"
                      >
                        Connect
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
              {isHomePage && (
                <div className="news-item-more text-xs mb-8 reveal-from-bottom">
                  <Link to="/doctors-counselors">View All</Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    );
  }
}

Team.propTypes = propTypes;
Team.defaultProps = defaultProps;

export default Team;
