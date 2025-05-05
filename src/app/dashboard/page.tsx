"use client";
import { useState } from "react";
import {
  Container,
  MenuItem,
  Select,
  Typography,
  Box,
  SelectChangeEvent,
} from "@mui/material";
import ChatContainer, { ChatMessage } from "@/components/chat/container";
import { useEffect } from "react";
import {
  collection,
  query,
  orderBy,
  limit,
  onSnapshot,
  Firestore,
  addDoc,
  where,
} from "firebase/firestore";
import { getFirebaseFirestore } from "@/lib/firestore/client";
import React from "react";
import { useAuthUser } from "@/hooks/use-auth-user";

type GameId =
  | "cs2"
  | "lol"
  | "valorant"
  | "r6"
  | "apex"
  | "rocketLeague"
  | "kingsLeague";

type Game = {
  id: GameId;
  name: string;
};

const mockGames = [
  { id: "cs2", name: "Counter-Strike 2" },
  { id: "lol", name: "League of Legends" },
  { id: "valorant", name: "Valorant" },
  { id: "r6", name: "Rainbow Six: Siege" },
  { id: "apex", name: "Apex Legends" },
  { id: "rocketLeague", name: "Rocket League" },
  { id: "kingsLeague", name: "Kings League" },
] satisfies Game[];

export default function DashboardPage() {
  const { authUser } = useAuthUser();
  const [firebaseFirestore] = React.useState<Firestore>(getFirebaseFirestore());
  const [selectedGame, setSelectedGame] = useState<GameId | "">("");

  const handleGameChange = (
    event: SelectChangeEvent<
      | "cs2"
      | "lol"
      | "valorant"
      | "r6"
      | "apex"
      | "rocketLeague"
      | "kingsLeague"
    >
  ) => {
    setSelectedGame(event.target.value as GameId);
  };

  const [messages, setMessages] = useState<ChatMessage[]>([]);

  useEffect(() => {
    if (!selectedGame) return; // Don't set up listener if no game is selected
    const messagesRef = collection(firebaseFirestore, "messages");
    const messagesQuery = query(
      messagesRef,
      where("gameId", "==", selectedGame),
      orderBy("timestamp", "desc"),
      limit(20)
    );

    const unsubscribe = onSnapshot(messagesQuery, (snapshot) => {
      const fetchedMessages = snapshot.docs.map((doc) => ({
        ...doc.data(),
      })) as ChatMessage[];

      setMessages(fetchedMessages.reverse()); // Reverse to show oldest first
    });

    return () => unsubscribe(); // Cleanup listener on unmount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedGame]);

  const handleSendMessage = async (text: string) => {
    const newMessage = {
      senderId: authUser!.id,
      senderName: authUser!.name!,
      text: text,
      id: new Date().toISOString(),
      timestamp: new Date(),
      gameId: selectedGame,
    } satisfies ChatMessage;

    try {
      const messagesRef = collection(firebaseFirestore, "messages");
      await addDoc(messagesRef, newMessage);
    } catch (error) {
      console.error("Error sending message: ", error);
    }
  };

  const videoLink = {
    cs2: "https://www.youtube.com/embed/UVnUgViWdvI",
    lol: "https://www.youtube.com/embed/FfeJlxSxJMw",
    valorant: "https://www.youtube.com/embed/ZOz8vw_btDc",
    r6: "",
    apex: "",
    rocketLeague: "",
    kingsLeague: "",
  };

  return (
    <Container>
      <Typography variant="h4" sx={{ my: 4 }}>
        Assistir um jogo
      </Typography>
      <Select
        value={selectedGame}
        onChange={handleGameChange}
        displayEmpty
        fullWidth
      >
        <MenuItem value="" disabled>
          Selecionar um jogo
        </MenuItem>
        {mockGames.map((game) => (
          <MenuItem key={game.id} value={game.id}>
            {game.name}
          </MenuItem>
        ))}
      </Select>

      {selectedGame && (
        <Box sx={{ mt: 4 }}>
          {videoLink[selectedGame] ? (
            <iframe
              width="100%"
              height="400"
              src={`${videoLink[selectedGame]}?autoplay=1`}
              title="Game Stream"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <Typography>Live não disponível no momento</Typography>
          )}
          <Box sx={{ mt: 2 }}>
            <ChatContainer
              messages={messages}
              onSendMessage={handleSendMessage}
            />
          </Box>
        </Box>
      )}
    </Container>
  );
}
