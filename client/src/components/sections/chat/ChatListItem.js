import React from "react";
import { useChatContext } from "../../../context/ChatContext";
import Avatar from "../../elements/Avatar";

const ChatListItem = (props) => {
  const { roomName, chatHistory, index, _id, author, members } = props;
  const { setSelectedIndex, setSelectedRoom, selectedIndex } = useChatContext();
  return (
    <section
      className={
        selectedIndex === index ? "chatlist__item active" : "chatlist__item"
      }
      onClick={() => {
        setSelectedRoom({ roomName, chatHistory, _id, author, members });
        setSelectedIndex(index);
      }}
    >
      <Avatar
        isConsultant={false}
        initials={roomName.substring(0, 2)}
        index={index}
      />
      <div className="userMeta">
        <p>{roomName}</p>
      </div>
    </section>
  );
};

export default ChatListItem;
