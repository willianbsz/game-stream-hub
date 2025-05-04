import * as React from "react";
import type { Metadata } from "next";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";

import { UpdatePasswordForm } from "@/components/auth/update-password-form";

export const metadata = {
  title: `Alterar senha`,
} satisfies Metadata;

interface PageProps {
  searchParams: { oobCode?: string };
}

export default function Page({ searchParams }: PageProps): React.JSX.Element {
  const { oobCode } = searchParams;

  if (!oobCode) {
    return (
      <Box sx={{ p: 3 }}>
        <Alert color="error">Code is required</Alert>
      </Box>
    );
  }

  return <UpdatePasswordForm oobCode={oobCode} />;
}
