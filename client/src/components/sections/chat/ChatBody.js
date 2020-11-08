import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { createStructuredSelector } from "reselect";
import Server from "../../../api/Server";
import { useChatContext } from "../../../context/ChatContext";
import { selectCurrentUser } from "../../../redux/auth/authSelector";
import { Toast } from "../../../utils/toast";
import Loading from "../../elements/Loading";
import ChatContent from "./ChatContent";
import ChatList from "./ChatList";

const ChatBody = () => {
  const [userRooms, setUserRooms] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { selectedIndex, selectedChatRoom } = useChatContext();

  const { currentUser } = useSelector(
    createStructuredSelector({
      currentUser: selectCurrentUser,
    })
  );

  useEffect(() => {
    if (currentUser) {
      getUserRooms();
    }
  }, [currentUser]);

  const getUserRooms = async () => {
    setIsLoading(true);
    try {
      const { data } = await Server.getUserRooms();
      setUserRooms(data.data);
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

  return isLoading ? (
    <Loading />
  ) : (
    <section className="chatbody">
      {currentUser ? (
        <>
          {userRooms.length ? (
            <>
              {" "}
              <ChatList userRooms={userRooms} />
              {selectedChatRoom && (
                <ChatContent
                  selectedIndex={selectedIndex}
                  selectedChatRoom={selectedChatRoom}
                  currentUser={currentUser}
                />
              )}
            </>
          ) : (
            <p className="fw-700 mt-32 ml-32">
              No Chat room joined. Please Join a chat room
            </p>
          )}
        </>
      ) : null}
    </section>
  );
};

export default ChatBody;
