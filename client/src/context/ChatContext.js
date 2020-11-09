import React, { useContext, createContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { createStructuredSelector } from "reselect";
import Server from "../api/Server";
import { selectCurrentUser } from "../redux/auth/authSelector";
import { Toast } from "../utils/toast";
import Pusher from "pusher-js";

const ChatContext = createContext();

export const ChatContextProvider = ({ children }) => {
  const [chatRooms, setChatRooms] = useState([]);
  const [userRooms, setUserRooms] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isFetchingUserRoom, setIsFetchingRoom] = useState(false);
  const [isJoining, setIsJoining] = useState(false);
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
    } else {
      getUserRooms();
    }
  }, [currentUser]);

  useEffect(() => {
    const pusher = new Pusher(process.env.REACT_APP_PURSER_API_KEY, {
      cluster: "eu",
    });

    const channel = pusher.subscribe("rooms");
    channel.bind("updated", (data) => {
      console.log(data);
    });

    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
  }, []);

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

  const getUserRooms = async () => {
    setIsFetchingRoom(true);
    try {
      const { data } = await Server.getUserRooms();
      setUserRooms(data.data);
      setIsFetchingRoom(false);
      setSelectedRoom(null);
      setSelectedIndex(-1);
    } catch (error) {
      setIsFetchingRoom(false);
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

  const joinRoom = async (roomId) => {
    const values = {
      roomId,
      userId: currentUser._id,
    };
    setIsJoining(true);

    try {
      const { data } = await Server.joinChatRoom(values);
      if (data.success) {
        Toast.fire({
          type: "success",
          title: "Joined room successfully",
          icon: "success",
        });
        getUserRooms();
        setIsJoining(false);
      }
    } catch (error) {
      setIsJoining(false);
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
        getChatRooms,
        userRooms,
        getUserRooms,
        joinRoom,
        isFetchingUserRoom,
        isJoining,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const useChatContext = () => useContext(ChatContext);
