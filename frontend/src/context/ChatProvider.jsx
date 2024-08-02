import { createContext, useContext, useEffect, useState } from "react";
const ChatContext = createContext();

const ChatProvider = (props) => {
  const { children } = props;
  const [user, setUser] = useState();

  useEffect(() => {
    // const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    // console.log(userInfo);
    setUser("rajib");
  }, []);
  return (
    <ChatContext.Provider value={{ user, setUser }}>
      {children}
    </ChatContext.Provider>
  );
};
export const ChatState = () => {
  return useContext(ChatContext);
};

export default ChatProvider;
