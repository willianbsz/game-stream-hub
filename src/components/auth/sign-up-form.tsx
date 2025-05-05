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
import { GoogleLogo as GoogleLogoIcon } from "@phosphor-icons/react/dist/ssr/GoogleLogo";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  updateProfile,
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

const schema = zod
  .object({
    name: zod.string().trim().min(1, {
      message: "O nome deve ser preenchido",
    }),
    email: zod
      .string()
      .min(1, { message: "O email deve ser preenchido" })
      .email({ message: "O email deve ser válido" }),
    password: zod
      .string()
      .min(6, { message: "A senha deve conter no mínimo 6 caracteres" }),
    confirmPassword: zod.string().optional(),
    terms: zod.boolean().refine((value) => value, "termsShouldBeAccepted"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não coincidem",
    path: ["confirmPassword"],
  });

type Values = zod.infer<typeof schema>;

const defaultValues = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
  terms: true,
} satisfies Values;

export function SignUpForm(): React.JSX.Element {
  const [firebaseAuth] = React.useState<Auth>(getFirebaseAuth());

  const [isPending, setIsPending] = React.useState<boolean>(false);

  const {
    control,
    handleSubmit,
    setError,
    watch,
    trigger,
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
        const userCredentials = await createUserWithEmailAndPassword(
          firebaseAuth,
          values.email,
          values.password
        );

        await updateProfile(userCredentials.user, {
          displayName: values.name,
        });

        await new Promise((resolve) => setTimeout(resolve, 500));
        window.location.reload();

        console.log("User created successfully", userCredentials.user);

        // UserProvider will handle Router refresh
        // After refresh, GuestGuard will handle the redirect
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

  const [terms, confirmPassword] = watch(["terms", "confirmPassword"]);

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
        <Typography variant="h5">Criar conta</Typography>
        <Typography color="text.secondary" variant="body2">
          Já tem uma conta?{" "}
          <Link
            component={RouterLink}
            href={paths.auth.signIn}
            variant="subtitle2"
          >
            Entrar
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
              >
                Google
              </Button>
            )
          )}
        </Stack>
        <Divider>Ou</Divider>
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
                    placeholder="Digite seu email"
                  />
                  {errors.email ? (
                    <FormHelperText>{errors.email.message}</FormHelperText>
                  ) : null}
                </FormControl>
              )}
            />
            <Controller
              control={control}
              name="name"
              render={({ field }) => (
                <FormControl error={Boolean(errors.password)}>
                  <InputLabel>Nome</InputLabel>
                  <OutlinedInput
                    {...field}
                    placeholder="Digite seu nome"
                    type="text"
                  />
                  {errors.name ? (
                    <FormHelperText>{errors.name.message}</FormHelperText>
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
                    type="password"
                    onChange={async (event) => {
                      field.onChange(event);
                      if (confirmPassword) {
                        await trigger("confirmPassword");
                      }
                    }}
                  />
                  {errors.password ? (
                    <FormHelperText>{errors.password.message}</FormHelperText>
                  ) : null}
                </FormControl>
              )}
            />
            <Controller
              control={control}
              name="confirmPassword"
              render={({ field }) => (
                <FormControl error={Boolean(errors.confirmPassword)}>
                  <InputLabel>Confirmação de senha</InputLabel>
                  <OutlinedInput
                    {...field}
                    type="password"
                    placeholder="Digite sua senha novamente"
                  />
                  {errors.confirmPassword ? (
                    <FormHelperText>
                      {errors.confirmPassword.message}
                    </FormHelperText>
                  ) : null}
                </FormControl>
              )}
            />
            {errors.root ? (
              <Alert color="error">{errors.root.message}</Alert>
            ) : null}
            <Button
              disabled={isPending || !terms || !isValid}
              type="submit"
              variant="contained"
            >
              Criar conta
            </Button>
          </Stack>
        </form>
      </Stack>
    </Stack>
  );
}
