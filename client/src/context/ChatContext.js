import React, { useContext, createContext, useEffect, useState } from "react";
import Server from "../api/Server";
import { Toast } from "../utils/toast";

const ChatContext = createContext();

export const ChatContextProvider = ({ children }) => {
  const [chatRooms, setChatRooms] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getChatRooms();
  }, []);

  const getChatRooms = async () => {
    setIsLoading(true);
    try {
      const rooms = await Server.getAllChatRooms();
      setChatRooms(rooms.data.data);
      setIsLoading(false);
      console.log(rooms);
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
    <ChatContext.Provider value={{ chatRooms, isLoading }}>
      {children}
    </ChatContext.Provider>
  );
};

export const useChatContext = () => useContext(ChatContext);
