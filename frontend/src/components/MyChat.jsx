import { useEffect, useState } from "react";
import { ChatState } from "../context/ChatProvider";
import { Box, Stack, Text, useToast } from "@chakra-ui/react";
import axios from "axios";
import ChatLoading from "./ChatLoading";
import { getSender } from "../config/ChatLogic";

function MyChat({ fetchAgain }) {
  const { user, seletedChat, setSelectedChat, chats, setChats } = ChatState();
  const [loggedUser, setLoggerdUser] = useState();
  const toast = useToast();

  const fetchChats = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.get(
        "http://localhost:5000/api/chat",
        config
      );

      setChats(data);
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: "Failed to load the chat",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };

  useEffect(() => {
    setLoggerdUser(JSON.parse(localStorage.getItem("userInfo")));
    fetchChats();
  }, [fetchAgain]);

  return (
    <Box
      display={{ base: seletedChat ? "none" : "flex", md: "flex" }}
      flexDir="column"
      alignItems="center"
      className=" bg-stone-50 shadow mt-2"
      w={{ base: "100%", md: "31%" }}
      borderRadius="lg"
      borderWidth="1px"
    >
      <Box
        pb={3}
        px={3}
        fontSize={{ base: "28px", md: "30px" }}
        display="flex"
        w="100%"
        justifyContent="center"
        alignItems="center"
      >
        MyChats
      </Box>
      <Box
        display="flex"
        flexDir="column"
        p={3}
        bg="#F8F8F8"
        width="100%"
        h="70vh"
        borderRadius="lg"
        overflow="hidden"
      >
        {chats ? (
          <Stack overflowY="scroll">
            {chats.map((chat) => (
              <Box
                onClick={() => setSelectedChat(chat)}
                cursor="pointer"
                bg={seletedChat === chat ? "#38B2AC" : "#E8E8E8"}
                color={seletedChat === chat ? "white" : "black"}
                px={3}
                py={2}
                key={chat._id}
                borderRadius="lg"
              >
                <Text>
                  {!chat.isGroupChat
                    ? getSender(loggedUser, chat.users)
                    : chat.chatName}
                </Text>
              </Box>
            ))}
          </Stack>
        ) : (
          <ChatLoading />
        )}
      </Box>
    </Box>
  );
}

export default MyChat;
