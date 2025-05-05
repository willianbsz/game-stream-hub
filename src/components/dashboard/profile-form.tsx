"use client";

import React from "react";
import { TextField, Button, Grid } from "@mui/material";
import { useAuthUser } from "@/hooks/use-auth-user";
import { getFirebaseFirestore } from "@/lib/firestore/client";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const profileSchema = z
  .object({
    name: z.string().min(1, "Nome é obrigatório"),
    phoneNumber: z
      .string()
      .optional()
      .refine((value) => !value || /^\d+$/.test(value), {
        message: "Celular/Whatsapp deve conter apenas números",
      }),
    cpf: z
      .string()
      .optional()
      .refine(
        (value) => !value || (value.length === 11 && /^\d+$/.test(value)),
        {
          message: "CPF deve ter 11 dígitos e conter apenas números",
        }
      ),
    cep: z
      .string()
      .length(8, "CEP deve ter 8 dígitos")
      .refine((value) => /^\d+$/.test(value), {
        message: "CEP deve conter apenas números",
      }),
    logradouro: z.string().optional(),
    numero: z
      .string()
      .optional()
      .refine((value) => !value || /^\d+$/.test(value), {
        message: "Número deve conter apenas números",
      }),
    bairro: z.string().optional(),
    cidade: z.string().optional(),
    estado: z.string().optional(),
  })
  .refine(
    (data) =>
      !(data.logradouro || data.numero || data.cep) ||
      (data.bairro && data.cidade && data.estado),
    {
      message:
        "Bairro, cidade e estado são obrigatórios se logradouro, número ou CEP forem preenchidos",
      path: ["bairro", "cidade", "estado", "numero"], // Highlight these fields in case of error
    }
  );

type ProfileFormData = z.infer<typeof profileSchema>;

export default function ProfileForm(): React.JSX.Element {
  const { authUser } = useAuthUser();
  const firebaseFirestore = getFirebaseFirestore();

  const {
    control,
    handleSubmit,
    setValue,
    reset,
    watch,
    formState: { errors },
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: authUser?.name || "",
      phoneNumber: "",
      cpf: "",
      cep: "",
      logradouro: "",
      numero: "",
      bairro: "",
      cidade: "",
      estado: "",
    },
  });

  const cep = watch("cep");

  const handleSave = async (data: ProfileFormData) => {
    if (authUser?.id) {
      const userDocRef = doc(firebaseFirestore, "users", authUser.id);
      try {
        await setDoc(userDocRef, data);
        alert("Dados salvos com sucesso!");
      } catch (error) {
        console.error("Erro ao salvar os dados:", error);
        alert("Falha ao salvar os dados.");
      }
    } else {
      alert("Usuário não autenticado.");
    }
  };

  React.useEffect(() => {
    const fetchUserData = async () => {
      if (authUser?.id) {
        const userDocRef = doc(firebaseFirestore, "users", authUser.id);
        try {
          const userDoc = await getDoc(userDocRef);
          if (userDoc.exists()) {
            reset(userDoc.data() as ProfileFormData);
          }
        } catch (error) {
          console.error("Erro ao buscar os dados do usuário:", error);
        }
      }
    };

    fetchUserData();
  }, [authUser, firebaseFirestore, reset]);

  React.useEffect(() => {
    const fetchCepData = async () => {
      if (cep && cep.length === 8) {
        try {
          const response = await fetch(
            `https://viacep.com.br/ws/${cep}/json/`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          const data = await response.json();
          if (!data.erro) {
            setValue("logradouro", data.logradouro || "");
            setValue("bairro", data.bairro || "");
            setValue("cidade", data.localidade || "");
            setValue("estado", data.uf || "");
          } else {
            alert("CEP não encontrado.");
          }
        } catch (error) {
          console.error("Error fetching CEP data:", error);
          alert("Falha ao procurar pelo cep.");
        }
      }
    };

    fetchCepData();
  }, [cep, setValue]);

  return (
    <form onSubmit={handleSubmit(handleSave)}>
      <Grid container spacing={2}>
        <Grid size={12}>
          <TextField
            fullWidth
            disabled
            label="Email"
            value={authUser?.email || ""}
            placeholder="Digite seu email"
          />
        </Grid>
        <Grid size={12}>
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                label="Name"
                placeholder="Digite seu nome"
                error={!!errors.name}
                helperText={errors.name?.message}
              />
            )}
          />
        </Grid>
        <Grid size={12}>
          <Controller
            name="phoneNumber"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                label="Celular/Whatsapp"
                placeholder="Digite seu celular/whatsapp"
                error={!!errors.phoneNumber}
                helperText={errors.phoneNumber?.message}
              />
            )}
          />
        </Grid>
        <Grid size={12}>
          <Controller
            name="cpf"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                label="CPF"
                placeholder="Digite seu CPF"
                error={!!errors.cpf}
                helperText={errors.cpf?.message}
              />
            )}
          />
        </Grid>
        <Grid size={12}>
          <Controller
            name="cep"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                label="CEP"
                placeholder="Digite seu CEP"
                error={!!errors.cep}
                helperText={errors.cep?.message}
              />
            )}
          />
        </Grid>
        <Grid size={12}>
          <Controller
            name="logradouro"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                label="Logradouro"
                placeholder="Digite seu logradouro (Rua, Avenida, Praça, etc.)"
                error={!!errors.logradouro}
                helperText={errors.logradouro?.message}
              />
            )}
          />
        </Grid>
        <Grid size={12}>
          <Controller
            name="numero"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                label="Número"
                placeholder="Digite o número da sua residência"
                error={!!errors.numero}
                helperText={errors.numero?.message}
              />
            )}
          />
        </Grid>
        <Grid size={12}>
          <Controller
            name="bairro"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                label="Bairro"
                placeholder="Digite seu bairro"
                error={!!errors.bairro}
                helperText={errors.bairro?.message}
              />
            )}
          />
        </Grid>
        <Grid size={12}>
          <Controller
            name="cidade"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                label="Cidade"
                placeholder="Digite sua cidade"
                error={!!errors.cidade}
                helperText={errors.cidade?.message}
              />
            )}
          />
        </Grid>
        <Grid size={12}>
          <Controller
            name="estado"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                label="Estado"
                placeholder="Digite seu estado"
                error={!!errors.estado}
                helperText={errors.estado?.message}
              />
            )}
          />
        </Grid>
        <Grid size={12}>
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Salvar
          </Button>
        </Grid>
      </Grid>
    </form>
  );
}
