import React from "react";
import { Box, Typography, Button } from "@mui/material";

export default function NotFound() {
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      height="100vh"
      textAlign="center"
      bgcolor="#f5f5f5"
    >
      <Typography variant="h1" color="primary" gutterBottom>
        404
      </Typography>
      <Typography variant="h5" color="textSecondary" gutterBottom>
        Oops! A página que você está procurando não foi encontrada.
      </Typography>
      <Button variant="contained" color="primary" href="/">
        Go to Homepage
      </Button>
    </Box>
  );
}
