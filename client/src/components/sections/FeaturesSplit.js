import React from "react";
import classNames from "classnames";
import { SectionSplitProps } from "../../utils/SectionProps";
import SectionHeader from "./partials/SectionHeader";
import Image from "../elements/Image";

const propTypes = {
  ...SectionSplitProps.types,
};

const defaultProps = {
  ...SectionSplitProps.defaults,
};

class FeaturesSplit extends React.Component {
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
      title: "Explore Our Features",
      paragraph: "Giving you the best always.",
    };

    return (
      <section {...props} className={outerClasses}>
        <div className="container">
          <div className={innerClasses}>
            <SectionHeader data={sectionHeader} className="center-content" />
            <div className={splitClasses}>
              <div className="split-item">
                <div className="split-item-content center-content-mobile">
                  <h3
                    className="mt-0 mb-16 reveal-from-bottom"
                    data-reveal-container=".split-item"
                  >
                    Access Doctors and Counselors
                  </h3>
                  <p
                    className="m-0 reveal-from-bottom"
                    data-reveal-delay="100"
                    data-reveal-container=".split-item"
                  >
                    Connect and chat with certified and verified doctors and
                    counselors. We have qualified doctors and counselors with
                    years of experience to help with your questions.
                  </p>
                </div>
                <div
                  className={classNames(
                    "split-item-image center-content-mobile reveal-scale-up",
                    imageFill && "split-item-image-fill"
                  )}
                  data-reveal-container=".split-item"
                  data-reveal-delay="200"
                >
                  <Image
                    // className="has-shadow"
                    src={require("./../../assets/images/doc-counselor.svg")}
                    alt="Features split 01"
                    width={528}
                    height={396}
                  />
                </div>
              </div>

              <div className="split-item">
                <div className="split-item-content center-content-mobile">
                  <h3
                    className="mt-0 mb-16 reveal-from-bottom"
                    data-reveal-container=".split-item"
                  >
                    The Arena
                  </h3>
                  <p
                    className="m-0 reveal-from-bottom"
                    data-reveal-delay="100"
                    data-reveal-container=".split-item"
                  >
                    Explore different topics on the arena. Connect with people
                    of same interest in a chat group and also create your own
                    chat group for discussion.
                  </p>
                </div>
                <div
                  className={classNames(
                    "split-item-image center-content-mobile reveal-scale-up",
                    imageFill && "split-item-image-fill"
                  )}
                  data-reveal-container=".split-item"
                  data-reveal-delay="200"
                >
                  <Image
                    // className="has-shadow"
                    src={require("./../../assets/images/chat-group.svg")}
                    alt="Features split 02"
                    width={528}
                    height={396}
                  />
                </div>
              </div>

              <div className="split-item">
                <div className="split-item-content center-content-mobile">
                  <h3
                    className="mt-0 mb-16 reveal-from-bottom"
                    data-reveal-container=".split-item"
                  >
                    Market Zone
                  </h3>
                  <p
                    className="m-0 reveal-from-bottom"
                    data-reveal-delay="100"
                    data-reveal-container=".split-item"
                  >
                    Shop for quality sexual and reproductive health product.
                  </p>
                </div>
                <div
                  className={classNames(
                    "split-item-image center-content-mobile reveal-scale-up",
                    imageFill && "split-item-image-fill"
                  )}
                  data-reveal-container=".split-item"
                  data-reveal-delay="200"
                >
                  <Image
                    // className="has-shadow"
                    src={require("./../../assets/images/shopping.svg")}
                    alt="Features split 03"
                    width={528}
                    height={396}
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

FeaturesSplit.propTypes = propTypes;
FeaturesSplit.defaultProps = defaultProps;

export default FeaturesSplit;
