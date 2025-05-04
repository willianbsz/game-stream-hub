// /app/page.tsx (Landing Page)
"use client";
import ImageCarousel from "@/components/core/image-carousel";
import { DynamicLogo } from "@/components/core/logo";
import { paths } from "@/paths";
import { Box, Button, Container, Typography } from "@mui/material";
import Link from "next/link";

export default function LandingPage() {
  return (
    <Container>
      <Box sx={{ textAlign: "center", my: 4 }}>
        <DynamicLogo
          colorDark="light"
          colorLight="light"
          height={160}
          width={160}
        />
        <Typography variant="h3" gutterBottom>
          Bem vindo Game Stream Hub
        </Typography>

        <Button
          href={paths.auth.signIn}
          component={Link}
          variant="contained"
          sx={{ m: 1 }}
        >
          Entrar
        </Button>
      </Box>

      <Box sx={{ height: 400, mb: 4, bgcolor: "#eee" }}>
        <ImageCarousel
          images={[
            "https://cdn.ome.lt/7W-hvLGFV1046YznreT3rljWIbE=/970x360/smart/uploads/conteudo/fotos/furia-aniversario-6-anos.png",
            "https://static.cdnlive.com.br/uploads/602/produto/17418698927689_detalhe.jpg",
          ]}
        />
      </Box>

      <Box id="about-us" sx={{ my: 4 }}>
        <Typography variant="h4" gutterBottom>
          Sobre nós
        </Typography>
        <Typography>
          Somos uma plataforma dedicada a conectar fans de E-Sports em um único
          lugar onde eles podem assistir aos jogos e trocar uma idéia!
        </Typography>
      </Box>

      <Box id="contact-us" sx={{ my: 4 }}>
        <Typography variant="h4" gutterBottom>
          Contate-nos
        </Typography>
        <Typography>Nos mande um email em support@gamestreamhub.com</Typography>
      </Box>
    </Container>
  );
}

// /app/dashboard/page.tsx
