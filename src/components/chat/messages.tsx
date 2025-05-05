"use client";

import React from "react";
import { Box, Typography, List, ListItem } from "@mui/material";
import { useAuthUser } from "@/hooks/use-auth-user";

export interface ChatMessage {
  id: string;
  text: string;
  senderId: string;
  senderName: string;
  timestamp: Date;
  gameId: string;
}

interface Props {
  messages: ChatMessage[];
}

export function ChatMessages({ messages }: Props): React.JSX.Element {
  const { authUser } = useAuthUser();
  const currentUserId = authUser?.id;

  return (
    <Box
      sx={{
        flex: 1,
        padding: 2,
        overflowY: "auto",
        backgroundColor: "#f9f9f9",
        minHeight: "400px",
        maxHeight: "400px",
      }}
      ref={(el: HTMLDivElement | null) => {
        if (el) {
          el.scrollTop = el.scrollHeight; // Scroll to the bottom
        }
      }}
    >
      <List>
        {messages.map((message) => (
          <ListItem
            key={message.id}
            disablePadding
            sx={{
              paddingY: 0.7,
              flexDirection: "column",
              alignItems:
                message.senderId === currentUserId ? "flex-end" : "flex-start",
            }}
          >
            <Typography
              variant="caption"
              sx={{
                color: "#888",
                alignSelf:
                  message.senderId === currentUserId
                    ? "flex-end"
                    : "flex-start",
              }}
            >
              {message.senderName}
            </Typography>

            <Typography
              sx={{
                padding: 1,
                textAlign: message.senderId === currentUserId ? "end" : "start",
                backgroundColor:
                  message.senderId === currentUserId ? "#c8e6c9" : "#e1f5fe",
                borderRadius: 1,
                maxWidth: "80%",
              }}
            >
              {message.text}
            </Typography>
          </ListItem>
        ))}
      </List>
    </Box>
  );
}

export default ChatMessages;
