import React from "react";
import Button from "../../elements/Button";
import { FiArrowRight } from "react-icons/fi";
import { useChatContext } from "../../../context/ChatContext";
import Loading from "../../elements/Loading";

const ChatRooms = () => {
  const { chatRooms, isLoading } = useChatContext();
  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <section className="chat-room">
          {chatRooms.map((room) => {
            return (
              <div className="room-item mb-16 has-shadow" key={room._id}>
                {room.roomName}
                <div className="room-controls">
                  <Button size="sm" color="secondary">
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <span className="tt-u">Join Room</span>
                      <FiArrowRight className="mr-4" />
                    </div>
                  </Button>
                </div>
              </div>
            );
          })}
        </section>
      )}
    </>
  );
};

export default ChatRooms;
