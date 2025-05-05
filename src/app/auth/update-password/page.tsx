import * as React from "react";
import type { Metadata } from "next";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";

import { UpdatePasswordForm } from "@/components/auth/update-password-form";

export const metadata = {
  title: `Alterar senha - Game Stream Hub`,
  description: `Altere sua senha de acesso ao Game Stream Hub`,
} satisfies Metadata;

interface PageProps {
  searchParams: Promise<{ oobCode?: string }>;
}

export const dynamic = "force-dynamic";

export default async function Page({
  searchParams,
}: PageProps): Promise<React.JSX.Element> {
  const { oobCode } = await searchParams;

  if (!oobCode) {
    return (
      <Box sx={{ p: 3 }}>
        <Alert color="error">Code is required</Alert>
      </Box>
    );
  }

  return <UpdatePasswordForm oobCode={oobCode} />;
}
