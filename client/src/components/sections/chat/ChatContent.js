import React, { Component, createRef } from "react";
import Avatar from "../../elements/Avatar";
import { FiPlusSquare, FiSend } from "react-icons/fi";
import ChatItem from "./ChatItem";

class ChatContent extends Component {
  messagesEndRef = createRef(null);

  scrollToBottom = () => {
    this.messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
  };
  render() {
    const { selectedChatRoom, selectedIndex, currentUser } = this.props;
    return (
      <div className="main__chatcontent">
        <div className="content__header mb-8">
          <div className="blocks">
            <div className="current-chatting-user">
              <Avatar
                isConsultant={false}
                initials={selectedChatRoom.roomName.substring(0, 2)}
                index={selectedIndex}
              />
              <p>{selectedChatRoom.roomName}</p>
            </div>
          </div>
        </div>
        <div className="content__body">
          <div className="chat__items">
            {selectedChatRoom.chatHistory.map((chat) => (
              <ChatItem {...chat} key={chat._id} currentUser={currentUser} />
            ))}

            <div ref={this.messagesEndRef} />
          </div>
        </div>
        <div className="content__footer has-shadow">
          <div className="sendNewMessage">
            <button className="addFiles">
              <FiPlusSquare />
            </button>
            <input
              type="text"
              placeholder="message  "
              //   onChange={this.onStateChange}
              //   value={this.state.msg}
            />
            <button className="btnSendMsg" id="sendMsgBtn">
              <FiSend />
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default ChatContent;
