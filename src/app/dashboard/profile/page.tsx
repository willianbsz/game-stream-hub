import React from "react";
import type { Metadata } from "next";

import { Container, Typography } from "@mui/material";
import ProfileForm from "@/components/dashboard/profile-form";

export const metadata = {
  title: `Editar perfil - Game Stream Hub`,
  description: `Edite seu perfil de acesso ao Game Stream Hub`,
} satisfies Metadata;

export default function ProfilePage(): React.JSX.Element {
  return (
    <Container maxWidth="sm" sx={{ my: 4 }}>
      <Typography variant="h4" gutterBottom>
        Editar perfil
      </Typography>
      <ProfileForm />
    </Container>
  );
}
