"use client";

import * as React from "react";
import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { Warning as WarningIcon } from "@phosphor-icons/react/dist/ssr/Warning";
import { sendPasswordResetEmail } from "firebase/auth";
import type { Auth } from "firebase/auth";

import { getFirebaseAuth } from "@/lib/auth/client";

export interface ResetPasswordButtonProps {
  children: React.ReactNode;
  email: string;
}

export function ResetPasswordButton({
  children,
  email,
}: ResetPasswordButtonProps): React.JSX.Element {
  const [firebaseAuth] = React.useState<Auth>(getFirebaseAuth());
  const [counter, setCounter] = React.useState<number>(60);

  React.useEffect(() => {
    if (counter > 0) {
      const interval = setInterval(() => {
        setCounter((prevCounter) => prevCounter - 1);
      }, 1000);

      return () => {
        clearInterval(interval);
      };
    }
  }, [counter]);

  const [isPending, setIsPending] = React.useState<boolean>(false);
  const [submitError, setSubmitError] = React.useState<string>();

  const handle = React.useCallback(async (): Promise<void> => {
    if (!email) {
      return;
    }

    try {
      setCounter(60);
      await sendPasswordResetEmail(firebaseAuth, email);
    } catch (err) {
      setSubmitError((err as { message: string }).message);
      setIsPending(false);
    }
  }, [firebaseAuth, email]);

  return (
    <Stack spacing={2}>
      {counter > 0 ? (
        <Alert color="warning" icon={<WarningIcon />}>
          <Typography sx={{ textAlign: "center" }} variant="body2">
            Por segurança, você só poderá fazer uma nova solicitação em{" "}
            {counter.toString()} segundos.
          </Typography>
        </Alert>
      ) : (
        ""
      )}
      {submitError ? <Alert color="error">{submitError}</Alert> : null}
      <Button
        disabled={!email || isPending || counter > 0}
        onClick={handle}
        variant="contained"
      >
        {children}
      </Button>
      {counter > 0 ? (
        <Typography sx={{ textAlign: "center" }} variant="body2">
          Aguarde alguns minutos para tentar novamente
        </Typography>
      ) : (
        ""
      )}
    </Stack>
  );
}
