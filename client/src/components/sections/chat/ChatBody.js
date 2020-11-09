import React from "react";
import { useSelector } from "react-redux";
import { createStructuredSelector } from "reselect";
import { useChatContext } from "../../../context/ChatContext";
import { selectCurrentUser } from "../../../redux/auth/authSelector";
import Loading from "../../elements/Loading";
import ChatContent from "./ChatContent";
import ChatList from "./ChatList";

const ChatBody = () => {
  const {
    selectedIndex,
    selectedChatRoom,
    userRooms,
    isFetchingUserRoom,
  } = useChatContext();

  const { currentUser } = useSelector(
    createStructuredSelector({
      currentUser: selectCurrentUser,
    })
  );

  return isFetchingUserRoom ? (
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
