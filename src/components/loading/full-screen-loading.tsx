import * as React from "react";
import { CircularProgress } from "@mui/material";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

interface LoadingDependenciesProps {
  title?: string;
  description?: string;
}

export default function FullScreenLoading(
  props: LoadingDependenciesProps
): React.JSX.Element {
  return (
    <Box
      component="main"
      sx={{
        alignItems: "center",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        minHeight: "100%",
        py: "64px",
      }}
    >
      <Container maxWidth="lg">
        <Stack spacing={6}>
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <CircularProgress />
          </Box>
          <Stack spacing={1} sx={{ textAlign: "center" }}>
            <Typography variant="h4">
              {props.title ?? "Carregando informações..."}{" "}
            </Typography>
            <Typography color="text.secondary">
              {props.description ??
                "Só mais um instante, você já vai acessar o que deseja!"}
            </Typography>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
}
