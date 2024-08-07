import React from "react";
import ScrollableFeed from "react-scrollable-feed";

function ScrollableChat(props) {
  const { message } = props;
  return (
    <ScrollableFeed>
      {message &&
        message.map((m, i) => <div className="flex" key={m._id}></div>)}
    </ScrollableFeed>
  );
}

export default ScrollableChat;
