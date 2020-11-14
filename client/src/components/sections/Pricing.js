import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { SectionTilesProps } from "../../utils/SectionProps";
import SectionHeader from "./partials/SectionHeader";
import Switch from "../elements/Switch";
import Button from "../elements/Button";
import Image from "../elements/Image";

const propTypes = {
  ...SectionTilesProps.types,
  pricingSwitcher: PropTypes.bool,
  pricingSlider: PropTypes.bool,
};

const defaultProps = {
  ...SectionTilesProps.defaults,
  pricingSwitcher: false,
  pricingSlider: false,
};

class Pricing extends React.Component {
  state = {
    priceChangerValue: "4",
    priceInput: {
      0: "1,000",
      1: "1,250",
      2: "1,500",
      3: "2,000",
      4: "2,500",
      5: "3,500",
      6: "6,000",
      7: "15,000",
      8: "50,000",
    },
    priceOutput: {
      plan1: {
        0: ["$", "0"],
        1: ["$", "13"],
        2: ["$", "17"],
        3: ["$", "21"],
        4: ["$", "27"],
        5: ["$", "42"],
        6: ["$", "58"],
        7: ["$", "117"],
        8: ["$", "208"],
      },
      plan2: {
        0: ["$", "13"],
        1: ["$", "17"],
        2: ["$", "21"],
        3: ["$", "25"],
        4: ["$", "47"],
        5: ["$", "58"],
        6: ["$", "117"],
        7: ["$", "208"],
        8: ["$", "299"],
      },
      plan3: {
        0: ["$", "17"],
        1: ["$", "21"],
        2: ["$", "25"],
        3: ["$", "42"],
        4: ["$", "67"],
        5: ["$", "117"],
        6: ["$", "208"],
        7: ["$", "299"],
        8: ["$", "499"],
      },
    },
  };

  slider = React.createRef();
  sliderValue = React.createRef();

  componentDidMount() {
    if (this.props.pricingSlider) {
      this.slider.current.setAttribute("min", 0);
      this.slider.current.setAttribute(
        "max",
        Object.keys(this.state.priceInput).length - 1
      );
      this.thumbSize = parseInt(
        window
          .getComputedStyle(this.sliderValue.current)
          .getPropertyValue("--thumb-size"),
        10
      );
      this.handleSliderValuePosition(this.slider.current);
    }
  }

  handlePricingSwitch = (e) => {
    this.setState({ priceChangerValue: e.target.checked ? "1" : "0" });
  };

  handlePricingSlide = (e) => {
    this.setState({ priceChangerValue: e.target.value });
    this.handleSliderValuePosition(e.target);
  };

  handleSliderValuePosition = (input) => {
    const multiplier = input.value / input.max;
    const thumbOffset = this.thumbSize * multiplier;
    const priceInputOffset =
      (this.thumbSize - this.sliderValue.current.clientWidth) / 2;
    this.sliderValue.current.style.left =
      input.clientWidth * multiplier - thumbOffset + priceInputOffset + "px";
  };

  getPricingData = (values, set) => {
    return set !== undefined
      ? values[this.state.priceChangerValue][set]
      : values[this.state.priceChangerValue];
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
      pushLeft,
      pricingSwitcher,
      pricingSlider,
      ...props
    } = this.props;

    const outerClasses = classNames(
      "pricing section",
      topOuterDivider && "has-top-divider",
      bottomOuterDivider && "has-bottom-divider",
      hasBgColor && "has-bg-color",
      invertColor && "invert-color",
      className
    );

    const innerClasses = classNames(
      "pricing-inner section-inner",
      topDivider && "has-top-divider",
      bottomDivider && "has-bottom-divider"
    );

    const tilesClasses = classNames("tiles-wrap", pushLeft && "push-left");

    const sectionHeader = {
      title: "FreeZone Shop",
      paragraph:
        "Vitae aliquet nec ullamcorper sit amet risus nullam eget felis semper quis lectus nulla at volutpat diam ut venenatis tellus in ornare.",
    };

    return (
      <section {...props} className={outerClasses}>
        <div className="container">
          <div className={innerClasses}>
            <SectionHeader
              data={sectionHeader}
              className="center-content invert-color"
            />
            {pricingSwitcher && (
              <div className="pricing-switcher center-content invert-color">
                <Switch
                  checked={this.state.priceChangerValue === "1" ? true : false}
                  onChange={this.handlePricingSwitch}
                  rightLabel="Billed Annually"
                >
                  Billed Monthly
                </Switch>
              </div>
            )}
            {pricingSlider && (
              <div className="pricing-slider center-content invert-color">
                <label className="form-slider">
                  <span className="mb-16">How many users do you have?</span>
                  <input
                    type="range"
                    ref={this.slider}
                    defaultValue={this.state.priceChangerValue}
                    onChange={this.handlePricingSlide}
                  />
                </label>
                <div ref={this.sliderValue} className="pricing-slider-value">
                  {this.getPricingData(this.state.priceInput)}
                </div>
              </div>
            )}
            <div className={tilesClasses}>
              <div className="tiles-item reveal-from-bottom">
                <div className="tiles-item-inner has-shadow">
                  <div className="pricing-item-content">
                    <div className="pricing-item-header pb-24 mb-24">
                      <div className="pricing-item-price mb-8">
                        <span className="pricing-item-price-currency h3">
                          {this.getPricingData(this.state.priceOutput.plan1, 0)}
                        </span>
                        <span className="pricing-item-price-amount h1">
                          {this.getPricingData(this.state.priceOutput.plan1, 1)}
                        </span>
                        <span className="pricing-item-price-after text-sm">
                          {this.getPricingData(this.state.priceOutput.plan1, 2)}
                        </span>
                      </div>
                      <div className="text-xs text-color-high">
                        Product Name
                      </div>
                    </div>
                    <div className="pricing-item-features mb-40">
                      <figure className="news-item-image m-0">
                        <Image
                          src={require("./../../assets/images/product1.jpg")}
                          alt="Product 1"
                          width={344}
                          height={50}
                        />
                      </figure>
                      <div className="pricing-item-features-title h6 text-xs text-color-low mb-24">
                        Product Details
                      </div>
                      <p className="text-sm">
                        Lorem ipsum dolor, sit amet consectetur adipisicing
                        elit. Est reprehenderit optio voluptas corporis incidunt
                      </p>
                    </div>
                  </div>
                  <div className="pricing-item-cta mb-8">
                    <Button tag="a" color="primary" wide>
                      Add to cart
                    </Button>
                  </div>
                </div>
              </div>

              <div className="tiles-item reveal-from-bottom">
                <div className="tiles-item-inner has-shadow">
                  <div className="pricing-item-content">
                    <div className="pricing-item-header pb-24 mb-24">
                      <div className="pricing-item-price mb-8">
                        <span className="pricing-item-price-currency h3">
                          {this.getPricingData(this.state.priceOutput.plan2, 0)}
                        </span>
                        <span className="pricing-item-price-amount h1">
                          {this.getPricingData(this.state.priceOutput.plan2, 1)}
                        </span>
                        <span className="pricing-item-price-after text-sm">
                          {this.getPricingData(this.state.priceOutput.plan2, 2)}
                        </span>
                      </div>
                      <div className="text-xs text-color-high">
                        Product Name
                      </div>
                    </div>
                    <div className="pricing-item-features mb-40">
                      <figure className="news-item-image m-0">
                        <Image
                          src={require("./../../assets/images/product2.jpg")}
                          alt="Product 2"
                          width={344}
                          height={50}
                        />
                      </figure>
                      <div className="pricing-item-features-title h6 text-xs text-color-low mb-24">
                        Product Details
                      </div>
                      <p className="text-sm">
                        Lorem ipsum dolor, sit amet consectetur adipisicing
                        elit. Est reprehenderit optio voluptas corporis incidunt
                      </p>
                    </div>
                  </div>
                  <div className="pricing-item-cta mb-8">
                    <Button tag="a" color="primary" wide>
                      Add to cart
                    </Button>
                  </div>
                </div>
              </div>

              <div className="tiles-item reveal-from-bottom">
                <div className="tiles-item-inner has-shadow">
                  <div className="pricing-item-content">
                    <div className="pricing-item-header pb-24 mb-24">
                      <div className="pricing-item-price mb-8">
                        <span className="pricing-item-price-currency h3">
                          {this.getPricingData(this.state.priceOutput.plan3, 0)}
                        </span>
                        <span className="pricing-item-price-amount h1">
                          {this.getPricingData(this.state.priceOutput.plan3, 1)}
                        </span>
                        <span className="pricing-item-price-after text-sm">
                          {this.getPricingData(this.state.priceOutput.plan3, 2)}
                        </span>
                      </div>
                      <div className="text-xs text-color-high">
                        Product Name
                      </div>
                    </div>
                    <div className="pricing-item-features mb-40">
                      <figure className="news-item-image m-0">
                        <Image
                          src={require("./../../assets/images/product3.jpeg")}
                          alt="NProduct 3"
                          width={344}
                          height={50}
                        />
                      </figure>
                      <div className="pricing-item-features-title h6 text-xs text-color-low mb-24">
                        Product Details
                      </div>
                      <p className="text-sm">
                        Lorem ipsum dolor, sit amet consectetur adipisicing
                        elit. Est reprehenderit optio voluptas corporis incidunt
                      </p>
                    </div>
                  </div>
                  <div className="pricing-item-cta mb-8">
                    <Button tag="a" color="primary" wide>
                      Add to cart
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

Pricing.propTypes = propTypes;
Pricing.defaultProps = defaultProps;

export default Pricing;
