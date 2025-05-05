"use client";

import React, { useState } from "react";
import { PaperPlaneRight as PaperPlaneIcon } from "@phosphor-icons/react/dist/ssr/PaperPlaneRight";
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  List,
  ListItem,
  Divider,
} from "@mui/material";
import { useAuthUser } from "@/hooks/use-auth-user";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";

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
  onSendMessage: (messageText: string) => void;
}

export function ChatContainer({
  messages,
  onSendMessage,
}: Props): React.JSX.Element {
  const { authUser } = useAuthUser();
  const currentUserId = authUser?.id;
  const [inputValue, setInputValue] = useState("");
  const [showPicker, setShowPicker] = useState(false);

  const handleSendMessage = () => {
    if (inputValue.trim()) {
      onSendMessage(inputValue.trim());
      setInputValue("");
    }
  };

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
      <Box
        sx={{
          flex: 1,
          padding: 2,
          overflowY: "auto",
          backgroundColor: "#f9f9f9",
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
                flexDirection: "column",
                alignItems:
                  message.senderId === currentUserId
                    ? "flex-end"
                    : "flex-start",
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
                  textAlign:
                    message.senderId === currentUserId ? "end" : "start",
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
      <Box
        sx={{
          display: "flex",
          padding: 2,
          borderTop: "1px solid #ccc",
          backgroundColor: "#fff",
        }}
      >
        <TextField
          slotProps={{
            input: {
              startAdornment: (
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <button
                    onClick={() => setShowPicker(!showPicker)}
                    style={{
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      padding: 0,
                      marginRight: 8,
                      fontSize: "1.5rem",
                      color: "gray", // Ensures it uses the current text color
                    }}
                  >
                    🙂
                  </button>
                  {showPicker && (
                    <>
                      <Box
                        sx={{
                          position: "absolute",
                          bottom: "60px",
                          left: "0px",
                          zIndex: 10,
                        }}
                        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the picker
                      >
                        <Picker
                          data={data}
                          onEmojiSelect={(emoji: { native: string }) => {
                            setInputValue((prev) => prev + emoji.native);
                          }}
                        />
                      </Box>
                      <Box
                        sx={{
                          position: "fixed",
                          top: 0,
                          left: 0,
                          width: "100%",
                          height: "100%",
                          zIndex: 9,
                        }}
                        onClick={() => setShowPicker(false)}
                      />
                    </>
                  )}
                  <Divider
                    orientation="vertical"
                    flexItem
                    sx={{ marginRight: 1 }}
                  />
                </Box>
              ),
            },
          }}
          fullWidth
          variant="outlined"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSendMessage();
            }
          }}
          placeholder="Escreva sua mensagem..."
          sx={{ marginRight: 2 }}
        />

        <Button
          endIcon={<PaperPlaneIcon />}
          variant="contained"
          color="primary"
          onClick={handleSendMessage}
        >
          Enviar
        </Button>
      </Box>
    </Paper>
  );
}

export default ChatContainer;
