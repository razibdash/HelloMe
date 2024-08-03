import React from "react";
import { ChatState } from "../context/ChatProvider";
import { Box } from "@chakra-ui/react";
import SideDrawer from "../components/miscellaneous/SideDrawer";
import MyChat from "../components/MyChat";
import ChatBox from "../components/ChatBox";

function ChatPage() {
  const { user } = ChatState();
  return (
    <div className="w-full">
      {user && <SideDrawer user={user} />}
      <Box className="flex">
        {user && <MyChat />}
        {user && <ChatBox />}
      </Box>
    </div>
  );
}

export default ChatPage;
