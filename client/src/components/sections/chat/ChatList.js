import React, { Component } from "react";
import ChatListItem from "./ChatListItem";

const ChatList = ({ userRooms }) => {
  return (
    <section className="main__chatlist">
      <div className="chatlist__heading">
        <h4>Conversations</h4>
      </div>
      <div className="chatlist__items">
        {userRooms.map((room, index) => (
          <ChatListItem {...room} key={room._id} index={index} />
        ))}
      </div>
    </section>
  );
};

export default ChatList;
