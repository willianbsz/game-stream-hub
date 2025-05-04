"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { confirmPasswordReset } from "firebase/auth";
import type { Auth } from "firebase/auth";
import { Controller, useForm } from "react-hook-form";
import { z as zod } from "zod";

import { paths } from "@/paths";
import { getFirebaseAuth } from "@/lib/auth/client";
import { DynamicLogo } from "@/components/core/logo";
import { toast } from "@/components/core/toaster";

const schema = zod
  .object({
    password: zod.string().min(6, { message: "passwordInvalidLength" }),
    confirmPassword: zod.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "passwordNotMatch",
    path: ["confirmPassword"],
  });

type Values = zod.infer<typeof schema>;

const defaultValues = { password: "", confirmPassword: "" } satisfies Values;

export interface UpdatePasswordFormProps {
  oobCode: string;
}

export function UpdatePasswordForm({
  oobCode,
}: UpdatePasswordFormProps): React.JSX.Element {
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

      try {
        await confirmPasswordReset(firebaseAuth, oobCode, values.password);
        toast.success("Senha alterada com sucesso", { duration: 3000 });
        router.push(paths.auth.signIn);
      } catch (err) {
        setError("root", {
          type: "server",
          message: (err as { code: string }).code,
        });
        setIsPending(false);
        return;
      }

      router.push(paths.app.home);
    },
    [firebaseAuth, oobCode, router, setError]
  );

  return (
    <Stack spacing={3}>
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
      <Typography variant="h5">Criar uma nova senha</Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={2}>
          <Controller
            control={control}
            name="password"
            render={({ field }) => (
              <FormControl error={Boolean(errors.password)}>
                <InputLabel>Senha</InputLabel>
                <OutlinedInput
                  {...field}
                  type="password"
                  placeholder="Digite uma nova senha"
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
                <InputLabel>Confirme a senha</InputLabel>
                <OutlinedInput
                  {...field}
                  type="password"
                  placeholder="Digite a senha novamente"
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
            disabled={isPending || !isValid}
            type="submit"
            variant="contained"
          >
            Salvar nova senha
          </Button>
        </Stack>
      </form>
    </Stack>
  );
}
