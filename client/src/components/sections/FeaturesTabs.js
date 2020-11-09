import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import classNames from "classnames";
import { SectionProps } from "../../utils/SectionProps";
import SectionHeader from "./partials/SectionHeader";
import Tabs, { TabList, Tab, TabPanel } from "./../elements/Tabs";
import Image from "../elements/Image";
import { HiUserGroup, HiChatAlt2, HiPlus } from "react-icons/hi";
import { FiUsers } from "react-icons/fi";
import ChatRooms from "./chat/ChatRooms";
import Conversions from "./chat/Conversions";
import CreateChatRoom from "./chat/CreateChatRoom";
import NotifyLogin from "./NotifyLogin";
import { selectCurrentUser } from "../../redux/auth/authSelector";

const propTypes = {
  ...SectionProps.types,
};

const defaultProps = {
  ...SectionProps.defaults,
};

class FeaturesTabs extends React.Component {
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
      isMain,
      currentUser,
      ...props
    } = this.props;

    const outerClasses = classNames(
      "features-tabs section center-content",
      topOuterDivider && "has-top-divider",
      bottomOuterDivider && "has-bottom-divider",
      hasBgColor && "has-bg-color",
      invertColor && "invert-color",
      className
    );

    const innerClasses = classNames(
      "features-tabs-inner ",
      isMain && "section-inner",
      topDivider && "has-top-divider",
      bottomDivider && "has-bottom-divider"
    );

    const sectionHeader = {
      title: "Built exclusively for you",
      paragraph:
        "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum — semper quis lectus nulla at volutpat diam ut venenatis.",
    };

    return (
      <section {...props} className={outerClasses}>
        <div className="container">
          <div className={innerClasses}>
            {isMain && (
              <SectionHeader data={sectionHeader} className="center-content " />
            )}
            <Tabs active="tab-a">
              <TabList>
                <Tab tabId="tab-a">
                  <div
                    className={
                      isMain
                        ? "features-tabs-tab-image mb-12"
                        : "features-tabs-tab-image mb-12 p-12"
                    }
                  >
                    {isMain ? (
                      <Image
                        src={require("./../../assets/images/group.svg")}
                        alt="Tab icon 01"
                        width={56}
                        height={56}
                      />
                    ) : (
                      <HiUserGroup size={35} className="text-color-primary" />
                    )}
                  </div>
                  <div className="text-color-high fw-600 text-sm">
                    Arena Chat Rooms
                  </div>
                </Tab>
                <Tab tabId="tab-b">
                  <div
                    className={
                      isMain
                        ? "features-tabs-tab-image mb-12"
                        : "features-tabs-tab-image mb-12 p-12"
                    }
                  >
                    {isMain ? (
                      <Image
                        src={require("./../../assets/images/features-tabs-icon-02.svg")}
                        alt="Tab icon 02"
                        width={56}
                        height={56}
                      />
                    ) : (
                      <HiChatAlt2 size={35} className="text-color-primary" />
                    )}
                  </div>
                  <div className="text-color-high fw-600 text-sm">
                    Joined Conversations
                  </div>
                </Tab>
                <Tab tabId="tab-c">
                  <div
                    className={
                      isMain
                        ? "features-tabs-tab-image mb-12"
                        : "features-tabs-tab-image mb-12 p-12"
                    }
                  >
                    {isMain ? (
                      <Image
                        src={require("./../../assets/images/features-tabs-icon-03.svg")}
                        alt="Tab icon 03"
                        width={56}
                        height={56}
                      />
                    ) : (
                      <HiPlus size={35} className="text-color-primary" />
                    )}
                  </div>
                  <div className="text-color-high fw-600 text-sm">
                    Create Chat Room
                  </div>
                </Tab>
                {isMain && (
                  <Tab tabId="tab-d">
                    <div
                      className={
                        isMain
                          ? "features-tabs-tab-image mb-12"
                          : "features-tabs-tab-image mb-12 p-12"
                      }
                    >
                      <Image
                        src={require("./../../assets/images/features-tabs-icon-04.svg")}
                        alt="Tab icon 04"
                        width={56}
                        height={56}
                      />
                    </div>
                    <div className="text-color-high fw-600 text-sm">
                      Internal Feedback
                    </div>
                  </Tab>
                )}
              </TabList>
              <TabPanel id="tab-a">
                <ChatRooms />
              </TabPanel>
              <TabPanel id="tab-b">
                {currentUser ? <Conversions /> : <NotifyLogin />}
              </TabPanel>
              <TabPanel id="tab-c">
                {currentUser ? <CreateChatRoom /> : <NotifyLogin />}
              </TabPanel>
              <TabPanel id="tab-d">
                <Image
                  className="has-shadow"
                  src={require("./../../assets/images/features-tabs-image.png")}
                  alt="Features tabs image 04"
                  width={896}
                  height={504}
                />
              </TabPanel>
            </Tabs>
          </div>
        </div>
      </section>
    );
  }
}

FeaturesTabs.propTypes = propTypes;
FeaturesTabs.defaultProps = defaultProps;

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});

export default connect(mapStateToProps, {})(FeaturesTabs);
