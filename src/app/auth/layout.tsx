import * as React from "react";

import { GuestGuard } from "@/components/auth/guest-guard";
import { Container } from "@mui/material";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps): React.JSX.Element {
  return (
    <GuestGuard>
      <Container maxWidth="sm">{children}</Container>
    </GuestGuard>
  );
}
