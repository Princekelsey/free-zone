import React, { Component } from "react";
import Avatar from "../../elements/Avatar";

class ChatItem extends Component {
  render() {
    return (
      <div className={`chat__item ${this.props.user ? this.props.user : ""}`}>
        <div className="chat__item__content">
          <div className="chat__msg">
            Hello how are you ? Lorem ipsum dolor sit amet consectetur,
            adipisicing elit. Cupiditate harum omnis necessitatibus nulla et
            natus, nobis nam soluta eius? Veniam mollitia saepe reprehenderit
            ipsam optio eum odio enim, assumenda doloremque.
          </div>
          <div className="chat__meta">
            <span>Rex</span>
            <span>16 mins ago</span>
            <span>Seen 1.03PM</span>
          </div>
        </div>

        <Avatar initials="r" fromChat />
      </div>
    );
  }
}

export default ChatItem;
