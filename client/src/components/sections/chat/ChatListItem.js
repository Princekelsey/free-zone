import React, { Component } from "react";
import Avatar from "../../elements/Avatar";

class ChatListItem extends Component {
  render() {
    return (
      <section className="chatlist__item">
        <Avatar isConsultant={false} initials="ab" />
        <div className="userMeta">
          <p>Homecoming</p>
        </div>
      </section>
    );
  }
}

export default ChatListItem;
