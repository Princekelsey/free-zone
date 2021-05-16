import React, { useEffect, useState } from "react";
import Avatar from "../../elements/Avatar";
import { FiSend } from "react-icons/fi";
import ChatItem from "./ChatItem";
import { useChatContext } from "../../../context/ChatContext";
import Server from "../../../api/Server";
import { Toast } from "../../../utils/toast";
import Loading from "../../elements/Loading";
import { animateScroll } from "react-scroll";

const ChatContent = ({ currentUser }) => {
  const [message, setMessage] = useState("");
  const [roomData, setRoomData] = useState(null);
  const [isFetching, setIsFetching] = useState(false);
  const [chatHistory, setChatHistory] = useState([]);

  const { selectedChatRoom, selectedIndex, socket } = useChatContext();

  useEffect(() => {
    if (socket && selectedChatRoom) {
      socket.emit("joinRoom", {
        chatroomId: selectedChatRoom._id,
      });
    }

    return () => {
      if (socket) {
        socket.emit("leaveRoom", {
          chatroomId: selectedChatRoom._id,
        });
      }
    };
  }, [selectedChatRoom, socket]);

  useEffect(() => {
    if (socket) {
      socket.on("newMessage", (message) => {
        const newMessages = [...chatHistory, message];
        setChatHistory(newMessages);
        scrollToBottom();
      });
    }
    // eslint-disable-next-line
  }, [chatHistory]);

  useEffect(() => {
    if (selectedChatRoom) {
      getRoomData();
    }
    // eslint-disable-next-line
  }, [selectedChatRoom]);

  const scrollToBottom = () => {
    animateScroll.scrollToBottom({
      containerId: "ChatBodyElementID",
      smooth: true,
    });
  };

  const getRoomData = async () => {
    setIsFetching(true);
    try {
      const { data } = await Server.getRoomById(selectedChatRoom._id);
      setRoomData(data.data);
      setChatHistory(data.data.chatHistory);
      setIsFetching(false);
    } catch (error) {
      setIsFetching(false);
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
          title: "Error getting rooms. Please try again",
          icon: "error",
        });
      }
    }
  };

  const handleChange = (e) => {
    setMessage(e.target.value);
  };

  const handleSend = () => {
    if (!message) return;

    if (socket) {
      socket.emit("chatroomMessage", {
        chatroomId: roomData._id,
        message,
      });

      setMessage("");
    }
  };

  return (
    <div className="main__chatcontent">
      <div className="content__header mb-8">
        <div className="blocks">
          {roomData && (
            <div className="current-chatting-user">
              <Avatar
                isConsultant={false}
                initials={selectedChatRoom.roomName.substring(0, 2)}
                index={selectedIndex}
              />
              <p>{selectedChatRoom.roomName}</p>
            </div>
          )}
        </div>
      </div>

      <div className="content__body" id="ChatBodyElementID">
        {isFetching ? (
          <Loading />
        ) : (
          <>
            {roomData ? (
              <div className="chat__items">
                {chatHistory.map((chat, index) => (
                  <ChatItem
                    {...chat}
                    key={`${index}-${chat.senderAlias}`}
                    currentUser={currentUser}
                  />
                ))}
              </div>
            ) : null}
          </>
        )}
      </div>
      <div className="content__footer has-shadow">
        <div className="sendNewMessage">
          {/* <button className="addFiles">
            <FiPlusSquare />
          </button> */}
          <input
            type="text"
            placeholder="message"
            onChange={handleChange}
            value={message}
            onKeyPress={(event) =>
              event.key === "Enter" ? handleSend() : null
            }
          />
          <button className="btnSendMsg" id="sendMsgBtn" onClick={handleSend}>
            <FiSend />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatContent;
