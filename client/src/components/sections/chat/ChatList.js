import React, { Component } from "react";
import ChatListItem from "./ChatListItem";

class ChatList extends Component {
  render() {
    return (
      <section className="main__chatlist">
        <div className="chatlist__heading">
          <h4>Conversations</h4>
        </div>
        <div className="chatlist__items">
          <ChatListItem />
          <ChatListItem />
          <ChatListItem />
          <ChatListItem />
          <ChatListItem />
          <ChatListItem />
          <ChatListItem />
          <ChatListItem />
          <ChatListItem />
          <ChatListItem />
        </div>
      </section>
    );
  }
}

export default ChatList;
