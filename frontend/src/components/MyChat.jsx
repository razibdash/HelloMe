import { useEffect, useState } from "react";
import { ChatState } from "../context/ChatProvider";
import { useToast } from "@chakra-ui/react";
import axios from "axios";

function MyChat() {
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
  }, []);
  return <div>MyChat</div>;
}

export default MyChat;
