import React, { useState } from "react";
import { useSelector } from "react-redux";
import { createStructuredSelector } from "reselect";
import Button from "../../elements/Button";
import { FiArrowRight } from "react-icons/fi";
import { useChatContext } from "../../../context/ChatContext";
import Loading from "../../elements/Loading";
import { MySwal } from "../../../utils/toast";
import { selectCurrentUser } from "../../../redux/auth/authSelector";

const ChatRooms = ({ history }) => {
  const [selected, setSelected] = useState(-1);

  const { currentUser } = useSelector(
    createStructuredSelector({
      currentUser: selectCurrentUser,
    })
  );

  const { chatRooms, isLoading, joinRoom, isJoining } = useChatContext();

  const handleJoinRoom = (id) => {
    if (!currentUser) {
      MySwal.fire({
        title: "Authentication required",
        text: "Have an account ? Login else Sign up for an annonimous account",
        icon: "info",
        confirmButtonText: "Login",
        confirmButtonColor: "#2174EA",
        denyButtonText: `Sign up`,
        denyButtonColor: "#2BBF96",
        showDenyButton: true,
        showCloseButton: true,
      }).then((result) => {
        if (result.isConfirmed) {
          history.push("/login");
        } else if (result.isDenied) {
          history.push("/signup");
        }
      });
    } else {
      setSelected(id);
      joinRoom(id);
    }
  };

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
                    onClick={() => handleJoinRoom(room._id)}
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
