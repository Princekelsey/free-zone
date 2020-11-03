import React, { Component, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Accordion from "../components/elements/Accordion";
import AccordionItem from "../components/elements/AccordionItem";
import GenericSection from "../components/sections/GenericSection";
import SectionHeader from "../components/sections/partials/SectionHeader";

const FAQHeader = {
  title: "Frequently asked questions",
};

class FrequentQuestions extends Component {
  render() {
    return (
      <GenericSection topDivider>
        <div className="container-xs">
          <SectionHeader data={FAQHeader} className="center-content" />
          <Accordion>
            <AccordionItem title="Nisi porta lorem mollis aliquam ut." active>
              Lorem ipsum is placeholder text commonly used in the graphic,
              print, and publishing industries for previewing layouts and visual
              mockups.
            </AccordionItem>
            <AccordionItem title="Nisi porta lorem mollis aliquam ut.">
              Lorem ipsum is placeholder text commonly used in the graphic,
              print, and publishing industries for previewing layouts and visual
              mockups.
            </AccordionItem>
            <AccordionItem title="Nisi porta lorem mollis aliquam ut.">
              Lorem ipsum is placeholder text commonly used in the graphic,
              print, and publishing industries for previewing layouts and visual
              mockups.
            </AccordionItem>
            <AccordionItem title="Nisi porta lorem mollis aliquam ut.">
              Lorem ipsum is placeholder text commonly used in the graphic,
              print, and publishing industries for previewing layouts and visual
              mockups.
            </AccordionItem>
            <AccordionItem title="Nisi porta lorem mollis aliquam ut.">
              Lorem ipsum is placeholder text commonly used in the graphic,
              print, and publishing industries for previewing layouts and visual
              mockups.
            </AccordionItem>
          </Accordion>
        </div>
      </GenericSection>
    );
  }
}

export default FrequentQuestions;
