"use client";

import React, { useState } from "react";
import { TextField, Box, Stack, Divider, Button } from "@mui/material";
import { PaperPlaneRight as PaperPlaneIcon } from "@phosphor-icons/react/dist/ssr/PaperPlaneRight";
import EmojiPicker, { EmojiClickData } from "emoji-picker-react";

const ChatInput: React.FC<{ onSend: (message: string) => void }> = ({
  onSend,
}) => {
  const [inputValue, setInputValue] = useState("");
  const [showPicker, setShowPicker] = useState(false);

  const handleSendMessage = () => {
    if (inputValue.trim()) {
      onSend(inputValue.trim());
      setInputValue("");
    }
  };

  return (
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
            endAdornment: (
              <Stack
                direction="row"
                spacing={1}
                sx={{ display: "flex", alignItems: "center" }}
              >
                <Divider
                  orientation="vertical"
                  flexItem
                  sx={{ marginLeft: 1 }}
                />
                <Button
                  endIcon={<PaperPlaneIcon />}
                  variant="contained"
                  color="primary"
                  onClick={handleSendMessage}
                >
                  Enviar
                </Button>
              </Stack>
            ),
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
                      <EmojiPicker
                        onEmojiClick={(emoji: EmojiClickData) => {
                          setInputValue((prev) => prev + emoji.emoji);
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
      />
    </Box>
  );
};

export default ChatInput;
