import { getSender, getSenderFull } from "../config/ChatLogic";
import { ChatState } from "../context/ChatProvider";
import { Box, FormControl, Spinner, Text, useToast } from "@chakra-ui/react";
import ProfileModal from "./miscellaneous/ProfileModal";
import { useEffect, useState } from "react";
import axios from "axios";
import ScrollableChat from "./ScrollableChat";
function SingleChat({ fetchAgain, setFetchAgain }) {
  const { user, selectedChat, setSelectedChat } = ChatState();

  // this is state decleration
  const [message, setMessage] = useState([]);
  const [newMessage, setNewMessage] = useState();
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  // this is hander section
  const fetchMessaage = async () => {
    if (!selectedChat) return;
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.get(
        `http://localhost:5000/api/message/${selectedChat._id}`,
        config
      );
      console.log(message);
      setMessage(data);
      setLoading(true);
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: "Failed to load the message",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top-left",
      });
    }
  };
  const sendMessage = async (e) => {
    if (e.key === "Enter" && newMessage) {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        };
        const { data } = await axios.post(
          "http://localhost:5000/api/message",
          {
            content: newMessage,
            chatId: selectedChat._id,
          },
          config
        );
        setNewMessage("");
        setMessage([...message, data]);
      } catch (error) {
        console.log(error.message);
        toast({
          title: "Error Occured!",
          description: "message not send",
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "top-left",
        });
      }
    }
  };
  const typingHandler = (e) => {
    setNewMessage(e.target.value);
  };

  useEffect(() => {
    fetchMessaage();
  }, [selectedChat]);
  return (
    <>
      {selectedChat ? (
        <>
          <Text
            fontSize={{ base: "28px", md: "25px" }}
            pb={3}
            px={2}
            w="100%"
            display="flex"
            justifyContent={{ base: "space-between" }}
            alignItems="center"
            className="uppercase text-stone-500"
          >
            {!selectedChat.isGroupChat ? (
              <>
                {getSender(user, selectedChat.users)}

                <ProfileModal user={getSenderFull(user, selectedChat.users)} />
              </>
            ) : (
              <></>
            )}
          </Text>
          <Box
            className="bg-stone-100 relative shadow"
            w="100%"
            h="100%"
            mt="2"
            display="flex"
            flexDir="column"
            overflowY="hidden"
            p={3}
            borderRadius="lg"
          >
            {loading === false ? (
              <Spinner
                size="xl"
                alignSelf="center"
                margin="auto"
                color="blue"
              />
            ) : (
              <div className="flex flex-col overflow-y-scroll scroll-m-0">
                <ScrollableChat message={message} />
              </div>
            )}
            <FormControl
              className="absolute"
              onKeyDown={sendMessage}
              isRequired
              mt={2}
            >
              <input
                type="text"
                className="w-full box-border py-2 rounded-lg outline-none px-2 border-2 border-black-100 text-stone-700 bg-stone-100 "
                onChange={typingHandler}
                value={newMessage}
                placeholder="enter your message"
              />
            </FormControl>
          </Box>
        </>
      ) : (
        <Box h="100%">
          <Text className="text-2xl pb-3 flex justify-center items-center h-full text-stone-400">
            Click on a user to Start Chatting
          </Text>
        </Box>
      )}
    </>
  );
}

export default SingleChat;
