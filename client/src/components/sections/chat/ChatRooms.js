import React, { useState } from "react";
import Button from "../../elements/Button";
import { FiArrowRight } from "react-icons/fi";
import { useChatContext } from "../../../context/ChatContext";
import Loading from "../../elements/Loading";

const ChatRooms = () => {
  const [selected, setSelected] = useState(-1);
  const { chatRooms, isLoading, joinRoom, isJoining } = useChatContext();

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
                  <Button
                    size="sm"
                    color="secondary"
                    onClick={() => {
                      setSelected(room._id);
                      joinRoom(room._id);
                    }}
                    className={
                      isJoining && selected === room._id ? "is-loading" : ""
                    }
                  >
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
