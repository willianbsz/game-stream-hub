import React, { useState } from "react";
import { TextField, IconButton, Box } from "@mui/material";
import { PaperPlane as PaperPlaneIcon } from "@phosphor-icons/react/dist/ssr/PaperPlane";

const ChatInput: React.FC<{ onSend: (message: string) => void }> = ({
  onSend,
}) => {
  const [message, setMessage] = useState("");

  const handleSend = () => {
    if (message.trim()) {
      onSend(message.trim());
      setMessage("");
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      handleSend();
    }
  };

  return (
    <Box display="flex" alignItems="center" gap={1}>
      <TextField
        fullWidth
        variant="outlined"
        placeholder="Type your message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyPress={handleKeyPress}
      />
      <IconButton color="primary" onClick={handleSend}>
        <PaperPlaneIcon />
      </IconButton>
    </Box>
  );
};

export default ChatInput;
