"use client";
import React, { useState } from "react";
import { TextField, Button, Container, Typography, Grid } from "@mui/material";
import { useAuthUser } from "@/hooks/use-auth-user";
import { getFirebaseFirestore } from "@/lib/firestore/client";
import { Firestore, doc, getDoc, setDoc } from "firebase/firestore";

const ProfilePage: React.FC = () => {
  const { authUser } = useAuthUser();
  const [firebaseFirestore] = React.useState<Firestore>(getFirebaseFirestore());

  const [name, setName] = useState(authUser?.name);
  const [email] = useState(authUser?.email);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [cpf, setCpf] = useState("");
  const [cep, setCep] = useState("");
  const [logradouro, setLogradouro] = useState("");
  const [numero, setNumero] = useState("");
  const [bairro, setBairro] = useState("");
  const [cidade, setCidade] = useState("");
  const [estado, setEstado] = useState("");

  const handleSave = async () => {
    if (authUser?.id) {
      const userDocRef = doc(firebaseFirestore, "users", authUser.id);
      try {
        await setDoc(userDocRef, {
          name,
          phoneNumber,
          cpf,
          cep,
          logradouro,
          numero,
          bairro,
          cidade,
          estado,
        });
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
            const userData = userDoc.data();
            setName(userData.name || "");
            setPhoneNumber(userData.phoneNumber || "");
            setCpf(userData.cpf || "");
            setCep(userData.cep || "");
            setLogradouro(userData.logradouro || "");
            setNumero(userData.numero || "");
            setBairro(userData.bairro || "");
            setCidade(userData.cidade || "");
            setEstado(userData.estado || "");
          }
        } catch (error) {
          console.error("Erro ao buscar os dados do usuário:", error);
        }
      }
    };

    fetchUserData();
  }, [authUser, firebaseFirestore]);

  const handleCepChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const newCep = e.target.value;
    setCep(newCep);

    if (newCep.length === 8) {
      try {
        const response = await fetch(
          `https://viacep.com.br/ws/${newCep}/json/`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const data = await response.json();
        if (!data.erro) {
          setLogradouro(data.logradouro || "");
          setBairro(data.bairro || "");
          setCidade(data.localidade || "");
          setEstado(data.uf || "");
        } else {
          alert("CEP não encontrado.");
        }
      } catch (error) {
        console.error("Error fetching CEP data:", error);
        alert("Falha ao procurar pelo cep.");
      }
    }
  };

  return (
    <Container maxWidth="sm" sx={{ my: 4 }}>
      <Typography variant="h4" gutterBottom>
        Editar perfil
      </Typography>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSave();
        }}
      >
        <Grid container spacing={2}>
          <Grid size={12}>
            <TextField
              fullWidth
              disabled
              label="Email"
              value={email}
              placeholder="Digite seu email"
            />
          </Grid>
          <Grid size={12}>
            <TextField
              fullWidth
              label="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Digite seu nome"
            />
          </Grid>
          <Grid size={12}>
            <TextField
              fullWidth
              label="Celular/Whatsapp"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="Digite seu celular/whatsapp"
            />
          </Grid>
          <Grid size={12}>
            <TextField
              fullWidth
              label="CPF"
              value={cpf}
              onChange={(e) => setCpf(e.target.value)}
              placeholder="Digite seu CPF"
            />
          </Grid>
          <Grid size={12}>
            <TextField
              fullWidth
              label="CEP"
              value={cep}
              onChange={handleCepChange}
              placeholder="Digite seu CEP"
            />
          </Grid>
          <Grid size={12}>
            <TextField
              fullWidth
              label="Logradouro"
              value={logradouro}
              onChange={(e) => setLogradouro(e.target.value)}
              placeholder="Digite seu logradouro (Rua, Avenida, Praça, etc.)"
            />
          </Grid>
          <Grid size={12}>
            <TextField
              fullWidth
              label="Número"
              value={numero}
              onChange={(e) => setNumero(e.target.value)}
              placeholder="Digite o número da sua residência"
            />
          </Grid>
          <Grid size={12}>
            <TextField
              fullWidth
              label="Bairro"
              value={bairro}
              onChange={(e) => setBairro(e.target.value)}
              placeholder="Digite seu bairro"
            />
          </Grid>
          <Grid size={12}>
            <TextField
              fullWidth
              label="Cidade"
              value={cidade}
              onChange={(e) => setCidade(e.target.value)}
              placeholder="Digite sua cidade"
            />
          </Grid>
          <Grid size={12}>
            <TextField
              fullWidth
              label="Estado"
              value={estado}
              onChange={(e) => setEstado(e.target.value)}
              placeholder="Digite seu estado"
            />
          </Grid>
          <Grid size={12}>
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Salvar
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default ProfilePage;
