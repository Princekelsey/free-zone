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
    return (
      <div className="main__chatcontent">
        <div className="content__header mb-8">
          <div className="blocks">
            <div className="current-chatting-user">
              <Avatar isConsultant={false} initials="ab" />
              <p>Homecoming</p>
            </div>
          </div>
        </div>
        <div className="content__body">
          <div className="chat__items">
            <ChatItem
              user={"me"}
              //   msg={itm.msg}
              //   image={itm.image}
            />

            <ChatItem
              user={"me"}
              //   msg={itm.msg}
              //   image={itm.image}
            />

            <ChatItem
              user={"me"}
              //   msg={itm.msg}
              //   image={itm.image}
            />
            <ChatItem
              user={"other"}
              //   msg={itm.msg}
              //   image={itm.image}
            />

            <ChatItem
              user={"me"}
              //   msg={itm.msg}
              //   image={itm.image}
            />

            <div ref={this.messagesEndRef} />
          </div>
        </div>
        <div className="content__footer">
          <div className="sendNewMessage">
            <button className="addFiles">
              <FiPlusSquare />
            </button>
            <input
              type="text"
              placeholder="Type a message here"
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
