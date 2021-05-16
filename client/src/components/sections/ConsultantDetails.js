import React, { Component } from "react";
import classNames from "classnames";
import { SectionSplitProps } from "../../utils/SectionProps";
import SectionHeader from "./partials/SectionHeader";
import Image from "../elements/Image";
import Button from "../elements/Button";
import { Link } from "react-router-dom";

const propTypes = {
  ...SectionSplitProps.types,
};

const defaultProps = {
  ...SectionSplitProps.defaults,
};

class ConsultantDetails extends Component {
  state = {
    isModal: false,
  };

  openModal = () => {
    this.setState({ isModal: true });
  };

  closeModal = () => {
    this.setState({ isModal: false });
  };

  render() {
    const {
      className,
      topOuterDivider,
      bottomOuterDivider,
      topDivider,
      bottomDivider,
      hasBgColor,
      invertColor,
      invertMobile,
      invertDesktop,
      alignTop,
      imageFill,
      consultant,
      ...props
    } = this.props;

    const outerClasses = classNames(
      "features-split section",
      topOuterDivider && "has-top-divider",
      bottomOuterDivider && "has-bottom-divider",
      hasBgColor && "has-bg-color",
      invertColor && "invert-color",
      className
    );

    const innerClasses = classNames(
      "features-split-inner section-inner",
      topDivider && "has-top-divider",
      bottomDivider && "has-bottom-divider"
    );

    const splitClasses = classNames(
      "split-wrap",
      invertMobile && "invert-mobile",
      invertDesktop && "invert-desktop",
      alignTop && "align-top"
    );

    const sectionHeader = {
      title: `Meet ${consultant.name}`,
      paragraph: consultant.shortInfo,
    };

    return (
      <section {...props} className={outerClasses}>
        <div className="container">
          <div className={innerClasses}>
            <SectionHeader data={sectionHeader} className="center-content" />
            <div className={splitClasses}>
              <div className="split-item">
                <div className="split-item-content center-content-mobile">
                  <h3 className="mt-0 mb-0" data-reveal-container=".split-item">
                    {consultant.name}
                  </h3>
                  <div className="team-item-role text-xs fw-600 mb-16 tt-c text-color-primary">
                    {consultant.title}
                  </div>
                  <p
                    className="m-0 "
                    data-reveal-delay="100"
                    data-reveal-container=".split-item"
                  >
                    {consultant.description}
                  </p>
                  <Button
                    tag={Link}
                    color="primary"
                    to={`/chat/${consultant._id}/`}
                    wideMobile
                    size="sm"
                    className="mt-16"
                    onClick={this.openModal}
                  >
                    {`Chat with ${consultant.name}`}
                  </Button>
                </div>
                <div
                  className={classNames(
                    "split-item-image center-content-mobile",
                    imageFill && "split-item-image-fill"
                  )}
                  data-reveal-container=".split-item"
                  data-reveal-delay="200"
                >
                  <Image
                    className="has-shadow"
                    src={consultant && consultant.image}
                    alt="Features split 01"
                    width={500}
                    height={300}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

ConsultantDetails.propTypes = propTypes;
ConsultantDetails.defaultProps = defaultProps;

export default ConsultantDetails;
