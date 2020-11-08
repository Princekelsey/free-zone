import React, { Component } from "react";
import Avatar from "../../elements/Avatar";
import moment from "moment";

class ChatItem extends Component {
  render() {
    const { message, senderAlias, date, currentUser } = this.props;
    let sender;
    if (senderAlias === currentUser.alias) {
      sender = "me";
    } else {
      sender = "other";
    }
    return (
      <div className={`chat__item ${sender ? sender : ""}`}>
        <div className="chat__item__content">
          <div className="chat__msg">{message}</div>
          <div className="chat__meta">
            <span className="tt-c">{senderAlias}</span>
            <span>{moment(date).format("MMM Do YY, h:mm")}</span>
          </div>
        </div>

        <Avatar initials={senderAlias.substring(0, 1)} fromChat />
      </div>
    );
  }
}

export default ChatItem;
