import React, { Component } from "react";
import Image from "../elements/Image";
import GenericSection from "./GenericSection";

class NewsDetails extends Component {
  render() {
    return (
      <GenericSection>
        <div className="container-xs">
          <h2 className="mt-0">
            Lorem ipsum is placeholder text commonly used in the graphic.
          </h2>
          <p>
            Lorem ipsum dolor sit amet,{" "}
            <a href="#0">consectetur adipiscing elit</a>, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Ut enim ad minim
            veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
            ea commodo consequat.
          </p>
          <p>
            Duis aute irure dolor in reprehenderit in voluptate velit esse
            cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
            cupidatat non proident, sunt in culpa qui officia deserunt mollit
            anim id est laborum.
          </p>
          <figure>
            <Image
              className="image-larger"
              src={require("../../assets/images/image-placeholder.jpg")}
              alt="Placeholder"
              width={712}
              height={400}
            />
            <figcaption className="text-color-low">
              A super-nice image{" "}
              <span role="img" aria-label="mile">
                😀
              </span>
            </figcaption>
          </figure>
          <h4>Flexibility</h4>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat sint occaecat cupidatat non
            proident, sunt in culpa qui officia deserunt mollit anim id est
            laborum.
          </p>
          <ul>
            <li>Lorem ipsum dolor sit amet, consectetur.</li>
            <li>Lorem ipsum dolor sit amet, consectetur.</li>
            <li>Lorem ipsum dolor sit amet, consectetur.</li>
          </ul>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris.
          </p>
        </div>
      </GenericSection>
    );
  }
}

export default NewsDetails;
