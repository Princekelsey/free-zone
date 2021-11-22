import React, { Component } from "react";
import { detectURL } from "./utils";
import ChatBox from "./ChatBox";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectCurrentUser } from "../../../../redux/auth/authSelector";
import SectionHeader from "../../partials/SectionHeader";

class ChatRoom extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      messages: [
        {
          id: 1,
          sender: this.props.consultant.name,
          senderAvatar: this.props.consultant.image,
          message: `Hello 👋, I am ${this.props.consultant.name}. How can I be of help to you ? `,
        },
      ],
      isTyping: [],
    };
    this.sendMessage = this.sendMessage.bind(this);
    this.typing = this.typing.bind(this);
    this.resetTyping = this.resetTyping.bind(this);
  }
  /* adds a new message to the chatroom */
  sendMessage(sender, senderAvatar, message) {
    setTimeout(() => {
      let messageFormat = detectURL(message);
      let newMessageItem = {
        id: this.state.messages.length + 1,
        sender: sender,
        senderAvatar: senderAvatar,
        message: messageFormat,
      };
      this.setState({ messages: [...this.state.messages, newMessageItem] });
      this.resetTyping(sender);
    }, 400);
  }
  /* updates the writing indicator if not already displayed */
  typing(writer) {
    if (!this.state.isTyping[writer]) {
      let stateTyping = this.state.isTyping;
      stateTyping[writer] = true;
      this.setState({ isTyping: stateTyping });
    }
  }
  /* hide the writing indicator */
  resetTyping(writer) {
    let stateTyping = this.state.isTyping;
    stateTyping[writer] = false;
    this.setState({ isTyping: stateTyping });
  }
  render() {
    let users = {};
    let chatBoxes = [];
    let messages = this.state.messages;
    let isTyping = this.state.isTyping;
    let sendMessage = this.sendMessage;
    let typing = this.typing;
    let resetTyping = this.resetTyping;
    const { consultant, currentUser } = this.props;

    /* user details - can add as many users as desired */
    users[0] = {
      name: consultant.name,
      avatar: consultant.image,
    };
    users[1] = {
      name: currentUser.alias,
      avatar: `https://ui-avatars.com/api/?name=${currentUser.alias}`,
    };

    /* creation of a chatbox for each user present in the chatroom */
    Object.keys(users).forEach(function (key) {
      const user = users[key];
      chatBoxes.push(
        <ChatBox
          key={key}
          owner={user.name}
          ownerAvatar={user.avatar}
          sendMessage={sendMessage}
          typing={typing}
          resetTyping={resetTyping}
          messages={messages}
          isTyping={isTyping}
        />
      );
    });
    return (
      <React.Fragment>
        <SectionHeader
          data={{
            paragraph: `This is a simulation of a chat between a consultant (Doctor/Counsellor) and a user for
              testing (consultant on the left and user on the right). When the application is in production, consultant (Doctor/Counsellor) and user will
              only see their own chat environment. `,
          }}
          className="center-content"
          style={{
            paddingTop: "100px",
          }}
        />

        <div className={"chatApp__room pt-0"}>{chatBoxes}</div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});

export default connect(mapStateToProps, {})(ChatRoom);
