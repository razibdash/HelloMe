import { getSender, getSenderFull } from "../config/ChatLogic";
import { ChatState } from "../context/ChatProvider";
import { Box, FormControl, Spinner, Text, useToast } from "@chakra-ui/react";
import ProfileModal from "./miscellaneous/ProfileModal";
import { useEffect, useState } from "react";
import axios from "axios";
import "./style.css";
import ScrollableChat from "./ScrollableChat";
import io from "socket.io-client";
const ENDPOINT = "http://localhost:5000";
let socket, selectedChatCompare;
function SingleChat({ fetchAgain, setFetchAgain }) {
  const { user, selectedChat, setSelectedChat } = ChatState();

  // this is state decleration
  const [message, setMessage] = useState([]);
  const [newMessage, setNewMessage] = useState();
  const [loading, setLoading] = useState(false);
  const [soketConnected, setSocketConnected] = useState(false);

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
      setMessage(data);
      setLoading(true);
      socket.emit("join chat", selectedChat._id);
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
        setNewMessage("");
        const { data } = await axios.post(
          "http://localhost:5000/api/message",
          {
            content: newMessage,
            chatId: selectedChat._id,
          },
          config
        );

        socket.emit("new message", data);
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
    socket = io(ENDPOINT);
    socket.emit("setup", user);
    socket.on("connection", () => {
      setSocketConnected(true);
    });
  }, []);

  useEffect(() => {
    fetchMessaage();
    selectedChatCompare = selectedChat;
  }, [selectedChat]);

  useEffect(() => {
    socket.on("message recieved", (newMessageRecieved) => {
      if (
        !selectedChatCompare ||
        selectedChatCompare._id !== newMessageRecieved.chat._id
      ) {
        //
      } else {
        setMessage([...message, newMessageRecieved]);
      }
    });
  });

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
              <div className="message scroll-m-0 hover:scroll-m-0">
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
