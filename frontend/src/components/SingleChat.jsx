import { getSender, getSenderFull } from "../config/ChatLogic";
import { ChatState } from "../context/ChatProvider";
import { Box, Text } from "@chakra-ui/react";
import ProfileModal from "./miscellaneous/ProfileModal";
function SingleChat({ fetchAgain, setFetchAgain }) {
  const { user, selectedChat, setSelectedChat } = ChatState();

  return (
    <>
      {selectedChat ? (
        <>
          <Text
            fontSize={{ base: "28px", md: "30px" }}
            pb={3}
            px={2}
            w="100%"
            display="flex"
            justifyContent={{ base: "space-between" }}
            alignItems="center"
            className="uppercase text-stone-500 bg-stone-100 rounded shadow"
          >
            {!selectedChat.isGroupChat ? (
              <>
                {getSender(user, selectedChat.users)}

                <ProfileModal user={getSenderFull(user, selectedChat.users)} />
              </>
            ) : (
              <>
                <h1>OPpss</h1>
              </>
            )}
          </Text>
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
