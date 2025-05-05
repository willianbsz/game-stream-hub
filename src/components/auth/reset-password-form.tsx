"use client";

import * as React from "react";
import RouterLink from "next/link";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import InputLabel from "@mui/material/InputLabel";
import Link from "@mui/material/Link";
import OutlinedInput from "@mui/material/OutlinedInput";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { ArrowLeft as ArrowLeftIcon } from "@phosphor-icons/react/dist/ssr/ArrowLeft";
import { sendPasswordResetEmail } from "firebase/auth";
import type { Auth } from "firebase/auth";
import { Controller, useForm } from "react-hook-form";
import { z as zod } from "zod";

import { paths } from "@/paths";
import { getFirebaseAuth } from "@/lib/auth/client";
import { DynamicLogo } from "@/components/core/logo";

const schema = zod.object({
  email: zod
    .string()
    .min(1, { message: "emailIsRequired" })
    .email({ message: "emailIsInvalid" }),
});

type Values = zod.infer<typeof schema>;

const defaultValues = { email: "" } satisfies Values;

export function ResetPasswordForm(): React.JSX.Element {
  const [firebaseAuth] = React.useState<Auth>(getFirebaseAuth());

  const router = useRouter();

  const [isPending, setIsPending] = React.useState<boolean>(false);

  const {
    control,
    handleSubmit,
    setError,
    formState: { errors, isValid },
  } = useForm<Values>({
    defaultValues,
    resolver: zodResolver(schema),
    mode: "onChange",
  });

  const onSubmit = React.useCallback(
    async (values: Values): Promise<void> => {
      setIsPending(true);

      // If you receive a link that opens a page with the error "The selected page mode is invalid"
      // you might have this issue https://github.com/firebase/firebase-js-sdk/issues/7981
      // In our case, we had to wait some time and then it started to work as expected.

      try {
        const searchParams = new URLSearchParams({ email: values.email });
        await sendPasswordResetEmail(firebaseAuth, values.email, {
          url: `${window.location.origin}${
            paths.auth.updatePassword
          }?${searchParams.toString()}`,
        });
        router.push(
          `${paths.auth.recoveryLinkSent}?${searchParams.toString()}`
        );
      } catch (err) {
        setError("root", {
          type: "server",
          message: (err as { code: string }).code,
        });
        setIsPending(false);
      }
    },
    [firebaseAuth, router, setError]
  );

  return (
    <Stack spacing={3} paddingY={3}>
      <Stack alignItems={"center"} justifyContent={"center"}>
        <DynamicLogo
          colorDark="light"
          colorLight="light"
          height={80}
          width={80}
        />
      </Stack>
      <div>
        <Link
          component={RouterLink}
          href={paths.auth.signIn}
          variant="subtitle1"
          sx={{ alignItems: "center", display: "inline-flex", gap: 1 }}
        >
          <ArrowLeftIcon color="secondary" fontSize="var(--icon-fontSize-md)" />
          Voltar para Entrar
        </Link>
      </div>
      <Stack spacing={1}>
        <Typography variant="h5">Recuperar senha</Typography>
        <Stack>
          <Typography textAlign="left" variant="body1">
            Informe o e-mail que você usou para criar a sua conta.
          </Typography>
          <Typography textAlign="left" variant="body1">
            Nós enviaremos um link para redefinir sua senha.
          </Typography>
        </Stack>
      </Stack>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={2}>
          <Controller
            control={control}
            name="email"
            render={({ field }) => (
              <FormControl error={Boolean(errors.email)}>
                <InputLabel>Email</InputLabel>
                <OutlinedInput
                  {...field}
                  type="email"
                  placeholder="Insira seu email"
                />
                {errors.email ? (
                  <FormHelperText>{errors.email.message}</FormHelperText>
                ) : null}
              </FormControl>
            )}
          />
          {errors.root ? (
            <Alert color="error">{errors.root.message}</Alert>
          ) : null}
          <Button
            disabled={isPending || !isValid}
            type="submit"
            variant="contained"
          >
            Enviar link de recuperação
          </Button>
        </Stack>
      </form>
    </Stack>
  );
}
