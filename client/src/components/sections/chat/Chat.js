import React, { Component } from "react";

import FeaturesTabs from "../FeaturesTabs";
import GenericSection from "../GenericSection";
import SectionHeader from "../partials/SectionHeader";

const sectionHeader = {
  title: "FreeZone Arena",
  paragraph:
    "Join conversions, create a chat room and get answers to your questions",
};

class Chat extends Component {
  render() {
    return (
      <GenericSection
        className="illustration-section-02 "
        hasBgColor
        invertColor
      >
        <div>
          <SectionHeader
            data={sectionHeader}
            className="center-content  pb-0"
          />
          <FeaturesTabs />
        </div>
      </GenericSection>
    );
  }
}

export default Chat;
