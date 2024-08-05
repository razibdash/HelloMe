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
      <Box className="flex justify-between m-2 gap-4">
        {user && <MyChat />}
        {user && <ChatBox />}
      </Box>
    </div>
  );
}

export default ChatPage;
