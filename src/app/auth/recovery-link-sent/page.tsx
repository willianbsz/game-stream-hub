import * as React from "react";
import type { Metadata } from "next";
import RouterLink from "next/link";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { ArrowLeft as ArrowLeftIcon } from "@phosphor-icons/react/dist/ssr/ArrowLeft";

import { paths } from "@/paths";
import { ResetPasswordButton } from "@/components/auth/reset-password-button";
import { DynamicLogo } from "@/components/core/logo";

export const metadata = {
  title: `Link de recuperação enviado`,
} satisfies Metadata;

interface PageProps {
  searchParams: { email?: string };
}

export default async function Page({
  searchParams,
}: PageProps): Promise<React.JSX.Element> {
  const { email } = searchParams;

  if (!email) {
    return (
      <Box sx={{ p: 3 }}>
        <Alert color="error">Email is required</Alert>
      </Box>
    );
  }

  return (
    <Stack spacing={4}>
      <div>
        <Box sx={{ display: "inline-block", fontSize: 0 }}>
          <DynamicLogo
            colorDark="light"
            colorLight="light"
            height={80}
            width={80}
          />
        </Box>
      </div>
      <Stack spacing={3}>
        <Stack spacing={1}>
          <Typography variant="h5">Link de recuperação enviado!</Typography>
          <Typography>
            Siga as instruções de recuperação de senha que enviamos para o seu
            endereço de e-mail: &quot;
            <Typography display="inline" color="primary" variant="subtitle1">
              {email}
            </Typography>
            <Typography display="inline">&quot;.</Typography>
          </Typography>
        </Stack>

        <div>
          <Link
            component={RouterLink}
            href={paths.auth.resetPassword}
            variant="subtitle1"
            sx={{ alignItems: "center", display: "inline-flex", gap: 1 }}
          >
            <ArrowLeftIcon
              color="secondary"
              fontSize="var(--icon-fontSize-md)"
            />
            Usar outro e-mail
          </Link>
        </div>
      </Stack>
      <ResetPasswordButton email={email}>
        Enviar link novamente
      </ResetPasswordButton>
    </Stack>
  );
}
