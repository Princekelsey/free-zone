import React, { Component } from "react";
import Image from "../elements/Image";
import GenericSection from "./GenericSection";

class NewsDetails extends Component {
  render() {
    const { blogDetails } = this.props;
    return (
      <GenericSection>
        <div className="container">
          <h2 className="mt-0">{blogDetails.title}</h2>
          <figure>
            <Image
              className="image-larger"
              src={require(`../../assets/images/${blogDetails.image}`)}
              alt={blogDetails.title}
              width={712}
              height={400}
            />
          </figure>
          <p>{blogDetails.blogBody}</p>
        </div>
      </GenericSection>
    );
  }
}

export default NewsDetails;
