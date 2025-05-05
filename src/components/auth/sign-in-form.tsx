"use client";

import * as React from "react";
import RouterLink from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import InputLabel from "@mui/material/InputLabel";
import Link from "@mui/material/Link";
import OutlinedInput from "@mui/material/OutlinedInput";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { Eye as EyeIcon } from "@phosphor-icons/react/dist/ssr/Eye";
import { EyeSlash as EyeSlashIcon } from "@phosphor-icons/react/dist/ssr/EyeSlash";
import { GoogleLogo as GoogleLogoIcon } from "@phosphor-icons/react/dist/ssr/GoogleLogo";
import {
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import type { Auth } from "firebase/auth";
import { Controller, useForm } from "react-hook-form";
import { z as zod } from "zod";

import { paths } from "@/paths";
import { getFirebaseAuth } from "@/lib/auth/client";
import { toast } from "@/components/core/toaster";
import { DynamicLogo } from "@/components/core/logo";

interface OAuthProvider {
  id: "google" | "github";
  name: string;
  logo: string;
}

const oAuthProviders = [
  { id: "google", name: "Google", logo: "/assets/logo-google.svg" },
] satisfies OAuthProvider[];

const schema = zod.object({
  email: zod
    .string({ message: "O email deve ser um texto" })
    .min(1, { message: "O email é obrigatório" })
    .email({ message: "O email deve ser válido" }),
  password: zod
    .string()
    .min(6, { message: "A senha deve ter no mínimo 6 digitos" }),
});

type Values = zod.infer<typeof schema>;

const defaultValues = { email: "", password: "" } satisfies Values;

export function SignInForm(): React.JSX.Element {
  const [firebaseAuth] = React.useState<Auth>(getFirebaseAuth());

  const [showPassword, setShowPassword] = React.useState<boolean>();

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

  const onAuth = React.useCallback(
    async (providerId: OAuthProvider["id"]): Promise<void> => {
      setIsPending(true);

      let provider: GoogleAuthProvider;

      switch (providerId) {
        case "google":
          provider = new GoogleAuthProvider();
          break;
        default:
          throw new Error(`Unknown provider: ${providerId}`);
      }

      try {
        await signInWithPopup(firebaseAuth, provider);
        // UserProvider will handle Router refresh
        // After refresh, GuestGuard will handle the redirect
      } catch (err) {
        setIsPending(false);
        toast.error((err as { message: string }).message);
      }
    },
    [firebaseAuth]
  );

  const onSubmit = React.useCallback(
    async (values: Values): Promise<void> => {
      setIsPending(true);
      try {
        await signInWithEmailAndPassword(
          firebaseAuth,
          values.email,
          values.password
        );
      } catch (err) {
        setError("root", {
          type: "server",
          message: (err as { code: string }).code,
        });
        setIsPending(false);
      }
    },
    [firebaseAuth, setError]
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
      <Stack spacing={1}>
        <Typography variant="h5">Entre com sua conta</Typography>
        <Typography color="text.secondary" variant="body2">
          Não tem uma conta? {""}
          <Link
            component={RouterLink}
            href={paths.auth.signUp}
            variant="subtitle2"
          >
            Crie uma agora
          </Link>
        </Typography>
      </Stack>
      <Stack spacing={3}>
        <Stack spacing={2}>
          {oAuthProviders.map(
            (provider): React.JSX.Element => (
              <Button
                disabled={isPending}
                endIcon={<GoogleLogoIcon weight="bold" />}
                key={provider.id}
                onClick={(): void => {
                  onAuth(provider.id).catch(() => {
                    // noop
                  });
                }}
                variant="outlined"
                sx={{ alignItems: "center", display: "inline-flex" }}
              >
                Google
              </Button>
            )
          )}
        </Stack>
        <Divider>Ou</Divider>
        <Stack spacing={2}>
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
                      placeholder="Exemplo: email@exemplo.com"
                    />
                    {errors.email ? (
                      <FormHelperText>{errors.email.message}</FormHelperText>
                    ) : null}
                  </FormControl>
                )}
              />
              <Controller
                control={control}
                name="password"
                render={({ field }) => (
                  <FormControl error={Boolean(errors.password)}>
                    <InputLabel>Senha</InputLabel>
                    <OutlinedInput
                      {...field}
                      placeholder="Digite sua senha"
                      endAdornment={
                        showPassword ? (
                          <EyeIcon
                            cursor="pointer"
                            fontSize="var(--icon-fontSize-md)"
                            onClick={(): void => {
                              setShowPassword(false);
                            }}
                          />
                        ) : (
                          <EyeSlashIcon
                            cursor="pointer"
                            fontSize="var(--icon-fontSize-md)"
                            onClick={(): void => {
                              setShowPassword(true);
                            }}
                          />
                        )
                      }
                      type={showPassword ? "text" : "password"}
                    />
                    {errors.password ? (
                      <FormHelperText>{errors.password.message}</FormHelperText>
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
                Entrar
              </Button>
            </Stack>
          </form>
          <div>
            <Link
              component={RouterLink}
              href={paths.auth.resetPassword}
              variant="subtitle2"
            >
              Esqueci minha senha
            </Link>
          </div>
        </Stack>
      </Stack>
    </Stack>
  );
}
