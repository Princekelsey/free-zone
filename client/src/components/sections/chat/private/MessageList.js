import React, { Component } from "react";
import MessageItem from "./MessageItem";

class MessageList extends Component {
  render() {
    return (
      <div className={"chatApp__convTimeline"}>
        {this.props.messages
          .slice(0)
          .reverse()
          .map((messageItem) => (
            <MessageItem
              key={messageItem.id}
              owner={this.props.owner}
              sender={messageItem.sender}
              senderAvatar={messageItem.senderAvatar}
              message={messageItem.message}
            />
          ))}
      </div>
    );
  }
}

export default MessageList;
