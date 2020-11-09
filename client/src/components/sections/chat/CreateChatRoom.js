import React, { useState } from "react";
import Button from "../../elements/Button";
import Input from "../../elements/Input";
import { MySwal, Toast } from "../../../utils/toast";
import Server from "../../../api/Server";
import { useChatContext } from "../../../context/ChatContext";

const modalFormStyle = {
  maxWidth: "320px",
  margin: "0 auto",
};

const CreateChatRoom = () => {
  const [roomName, setRoomName] = useState("");
  const { getChatRooms, getUserRooms } = useChatContext();

  const handleChange = (e) => {
    setRoomName(e.target.value);
  };

  const creatRoom = async () => {
    try {
      const { data } = await Server.createRoom(roomName);
      if (data.success) {
        Toast.fire({
          type: "success",
          title: "Room created successfully",
          icon: "success",
        });
        setRoomName("");
        getChatRooms();
        getUserRooms();
      }
    } catch (error) {
      const {
        response: { data },
      } = error;
      if (data) {
        Toast.fire({
          type: "error",
          title: data.error,
          icon: "error",
        });
      } else {
        Toast.fire({
          type: "error",
          title: "Login failed. Please try again",
          icon: "error",
        });
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!roomName || roomName.length === 1) {
      MySwal.fire({
        icon: "error",
        title: "Oops...",
        text: "Room name is required and must be more than one character",
      });
      return;
    }
    creatRoom();
  };

  return (
    <section>
      <div className="center-content">
        <h3 className="mt-16 mb-8">Create A Chat Room</h3>
        <p className="text-sm">Create a chat room for a specific topic</p>
      </div>
      <form style={modalFormStyle} onSubmit={handleSubmit}>
        <div className="mb-12">
          <Input
            type="text"
            label="Room Name"
            placeholder="Enter roon name"
            labelHidden
            onChange={handleChange}
            value={roomName}
            required
          />
        </div>
        <Button color="primary" wide>
          Create
        </Button>
      </form>
    </section>
  );
};

export default CreateChatRoom;
