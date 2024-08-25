"use client";
import { Box, Button, Stack, TextField, Typography, Paper, AppBar, Toolbar, IconButton } from "@mui/material";
import { useState } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import SchoolIcon from '@mui/icons-material/School';

// Create a custom theme
const theme = createTheme({
  palette: {
    primary: {
      main: "#003366", // Dark blue
      light: "#335580", // Lighter blue
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#ffcc00", // Gold
      contrastText: "#000000",
    },
    background: {
      default: "#f4f4f9", // Light background
    },
  },
  typography: {
    fontFamily: "Roboto, sans-serif",
    h5: {
      fontFamily: "Georgia, serif", // Academic feel
      fontWeight: "bold",
    },
    body1: {
      fontFamily: "Roboto, sans-serif",
    },
  },
});

export default function Home() {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: `Hi! I'm the Rate My Professor support assistant. How can I help you today?`,
    },
  ]);
  const [message, setMessage] = useState("");

  const sendMessage = async () => {
    setMessage("");
    setMessages((messages) => [
      ...messages,
      { role: "user", content: message },
      { role: "assistant", content: "" },
    ]);

    const response = fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify([...messages, { role: "user", content: message }]),
    }).then(async (res) => {
      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let result = "";

      return reader.read().then(function processText({ done, value }) {
        if (done) {
          return result;
        }
        const text = decoder.decode(value || new Uint8Array(), {
          stream: true,
        });
        setMessages((messages) => {
          let lastMessage = messages[messages.length - 1];
          let otherMessages = messages.slice(0, messages.length - 1);
          return [
            ...otherMessages,
            { ...lastMessage, content: lastMessage.content + text },
          ];
        });
        return reader.read().then(processText);
      });
    });
  };

  return (
    <ThemeProvider theme={theme}>
      <Box width="100vw" height="100vh" display="flex" flexDirection="column" bgcolor="background.default">
        <AppBar position="static">
          <Toolbar>
            <IconButton edge="start" color="inherit" aria-label="menu">
              <SchoolIcon />
            </IconButton>
            <Typography variant="h5" color="inherit">
              Rate My Professor Assistant
            </Typography>
          </Toolbar>
        </AppBar>
        <Box
          width="100%"
          height="calc(100vh - 64px)" // Adjust height for AppBar
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
        >
          <Paper
            elevation={3}
            sx={{
              width: { xs: "90%", sm: "500px" },
              height: "70vh",
              maxHeight: "700px",
              p: 2,
              display: "flex",
              flexDirection: "column",
              borderRadius: 2,
              overflow: "hidden",
            }}
          >
            <Stack
              direction="column"
              spacing={2}
              flexGrow={1}
              overflow="auto"
              sx={{ maxHeight: "100%", mb: 2 }}
            >
              {messages.map((message, index) => (
                <Box
                  key={index}
                  display="flex"
                  justifyContent={
                    message.role === "assistant" ? "flex-start" : "flex-end"
                  }
                >
                  <Box
                    bgcolor={
                      message.role === "assistant" ? "primary.light" : "secondary.main"
                    }
                    color={
                      message.role === "assistant" ? "primary.contrastText" : "secondary.contrastText"
                    }
                    borderRadius={2}
                    p={2}
                    maxWidth="80%"
                  >
                    <Typography>{message.content}</Typography>
                  </Box>
                </Box>
              ))}
            </Stack>
            <Stack direction="row" spacing={2}>
              <TextField
                label="Type your message..."
                fullWidth
                variant="outlined"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                sx={{ flexGrow: 1 }}
              />
              <Button variant="contained" color="primary" onClick={sendMessage}>
                Send
              </Button>
            </Stack>
          </Paper>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
