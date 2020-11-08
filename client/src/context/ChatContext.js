import React, { useContext, createContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { createStructuredSelector } from "reselect";
import Server from "../api/Server";
import { selectCurrentUser } from "../redux/auth/authSelector";
import { Toast } from "../utils/toast";

const ChatContext = createContext();

export const ChatContextProvider = ({ children }) => {
  const [chatRooms, setChatRooms] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedChatRoom, setSelectedRoom] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(-1);

  const { currentUser } = useSelector(
    createStructuredSelector({
      currentUser: selectCurrentUser,
    })
  );

  useEffect(() => {
    getChatRooms();
  }, []);

  useEffect(() => {
    if (!currentUser) {
      setSelectedRoom(null);
      setSelectedIndex(-1);
    }
  }, [currentUser]);

  const getChatRooms = async () => {
    setIsLoading(true);
    try {
      const rooms = await Server.getAllChatRooms();
      setChatRooms(rooms.data.data);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
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

  return (
    <ChatContext.Provider
      value={{
        chatRooms,
        isLoading,
        selectedChatRoom,
        selectedIndex,
        setSelectedRoom,
        setSelectedIndex,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const useChatContext = () => useContext(ChatContext);
