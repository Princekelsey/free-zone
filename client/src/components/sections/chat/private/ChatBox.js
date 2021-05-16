import React, { Component } from "react";
import MessageList from "./MessageList";
import Title from "./Title";
import TypingIndicator from "./TypingIndicator";
import InputMessage from "./InputMessage";

class ChatBox extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      isLoading: false,
    };
    this.sendMessageLoading = this.sendMessageLoading.bind(this);
  }
  /* catch the sendMessage signal and update the loading state then continues the sending instruction */
  sendMessageLoading(sender, senderAvatar, message) {
    this.setState({ isLoading: true });
    this.props.sendMessage(sender, senderAvatar, message);
    setTimeout(() => {
      this.setState({ isLoading: false });
    }, 400);
  }
  render() {
    return (
      <div className={"chatApp__conv"}>
        <Title owner={this.props.owner} />
        <MessageList owner={this.props.owner} messages={this.props.messages} />
        <div className={"chatApp__convSendMessage clearfix"}>
          <TypingIndicator
            owner={this.props.owner}
            isTyping={this.props.isTyping}
          />
          <InputMessage
            isLoading={this.state.isLoading}
            owner={this.props.owner}
            ownerAvatar={this.props.ownerAvatar}
            sendMessage={this.props.sendMessage}
            sendMessageLoading={this.sendMessageLoading}
            typing={this.props.typing}
            resetTyping={this.props.resetTyping}
          />
        </div>
      </div>
    );
  }
}

export default ChatBox;
