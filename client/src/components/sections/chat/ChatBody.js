import React, { Component } from "react";
import ChatContent from "./ChatContent";
import ChatList from "./ChatList";

class ChatBody extends Component {
  render() {
    return (
      <section className="chatbody">
        <ChatList />
        <ChatContent />
      </section>
    );
  }
}

export default ChatBody;
