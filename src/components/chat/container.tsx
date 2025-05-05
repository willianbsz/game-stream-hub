"use client";

import React from "react";
import { Paper } from "@mui/material";
import ChatInput from "./input";
import ChatMessages, { ChatMessage } from "./messages";

interface Props {
  messages: ChatMessage[];
  onSendMessage: (messageText: string) => void;
}

export function ChatContainer({
  messages,
  onSendMessage,
}: Props): React.JSX.Element {
  return (
    <Paper
      elevation={3}
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        height: "100%",
        borderRadius: 2,
        overflow: "hidden",
      }}
    >
      <ChatMessages messages={messages} />
      <ChatInput onSend={onSendMessage} />
    </Paper>
  );
}

export default ChatContainer;
