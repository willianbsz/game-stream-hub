import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { useRouter } from "next/navigation";

const NotFound = () => {
  const router = useRouter();

  const handleGoHome = () => {
    router.push("/");
  };

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
      <Button variant="contained" color="primary" onClick={handleGoHome}>
        Go to Homepage
      </Button>
    </Box>
  );
};

export default NotFound;
