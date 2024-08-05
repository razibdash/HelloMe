import { Box } from "@chakra-ui/react";
import { ChatState } from "../context/ChatProvider";
function ChatBox() {
  const { selectedChat } = ChatState();
  return (
    <Box
      d={{ base: selectedChat ? "flex" : "none", md: "flex" }}
      alignItems="center"
      flexDir="column"
      p={3}
      bg="white"
      marginTop={2}
      className="shadow-md"
      w={{ base: "100%", md: "68%" }}
      borderRadius="lg"
    >
      single Chat
    </Box>
  );
}

export default ChatBox;
