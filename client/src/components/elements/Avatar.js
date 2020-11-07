import React, { Component } from "react";
import colors from "../../assets/colors";

class Avatar extends Component {
  render() {
    const { isConsultant, initials, image, fromChat } = this.props;
    return (
      <React.Fragment>
        {isConsultant ? (
          <div className="avatar">
            <div className="avatar-img">
              <img
                src={image ? image : "https://via.placeholder.com/150"}
                alt="#"
              />
            </div>
          </div>
        ) : (
          <div
            className="roomImage"
            style={!fromChat ? { backgroundColor: colors[4] } : {}}
          >
            {initials}
          </div>
        )}
      </React.Fragment>
    );
  }
}

export default Avatar;
