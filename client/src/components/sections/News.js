import React from "react";
import { Link } from "react-router-dom";
import classNames from "classnames";
import { SectionTilesProps } from "../../utils/SectionProps";
import SectionHeader from "./partials/SectionHeader";
import Image from "../elements/Image";

const propTypes = {
  ...SectionTilesProps.types,
};

const defaultProps = {
  ...SectionTilesProps.defaults,
};

class News extends React.Component {
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
      fullPage,
      blogs,
      ...props
    } = this.props;

    const outerClasses = classNames(
      "news section",
      topOuterDivider && "has-top-divider",
      bottomOuterDivider && "has-bottom-divider",
      hasBgColor && "has-bg-color",
      invertColor && "invert-color",
      className
    );

    const innerClasses = classNames(
      "news-inner section-inner",
      topDivider && "has-top-divider",
      bottomDivider && "has-bottom-divider"
    );

    const tilesClasses = classNames("tiles-wrap", pushLeft && "push-left");

    const sectionHeader = {
      title: "Blogs And Articles",
      paragraph: "Educative articles for your sexual and reproductive health",
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
              {blogs.map((blog) => {
                const { id, title, shortDescription, image } = blog;

                return (
                  <div className="tiles-item reveal-from-bottom" key={id}>
                    <div className="tiles-item-inner has-shadow">
                      <figure className="news-item-image m-0">
                        <Image
                          src={require(`./../../assets/images/${image}`)}
                          alt={title}
                          width={344}
                          height={194}
                        />
                      </figure>
                      <div className="news-item-content">
                        <div className="news-item-body">
                          <h3 className="news-item-title h4 mt-0 mb-8">
                            <Link to={`/blogs/${id}`}>{title}</Link>
                          </h3>
                          <p className="mb-16 text-sm">{shortDescription}</p>
                        </div>
                        <div className="news-item-more text-xs mb-8">
                          <Link to={`/blogs/${id}`}>Read more</Link>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}

              {!fullPage && (
                <div className="news-item-more text-xs mb-8">
                  <Link to="/blogs">View All</Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    );
  }
}

News.propTypes = propTypes;
News.defaultProps = defaultProps;

export default News;
