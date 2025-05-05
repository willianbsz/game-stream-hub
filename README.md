# 🎮 Game Stream Hub

O **Game Stream Hub** é uma plataforma desenvolvida com Next.js e Material UI, criada para torcedores acompanharem jogos ao vivo com integração de vídeos do YouTube e chat em tempo real. Inspirada nos "furiosos", fãs da FURIA, a aplicação permite selecionar o jogo em destaque, interagir com outros torcedores e acompanhar transmissões 
de forma centralizada.

---

## 🚀 Funcionalidades

- **Landing Page** Onde nos apresentamos - seções "Sobre" e "Contato".
- **Autenticação completa** com Google, login, cadastro e recuperação de senha.
- **Seleção dinâmica de jogos** com dropdown personalizado.
- **Exibição de vídeo do youtube ao vivo (iframe)** se o jogo estiver com link na aplicação.
- **Chat em tempo real por jogo**, com mensagens visíveis instantaneamente entre usuários.
- **Design responsivo** e intuitivo, ideal para desktop e mobile.

---

## 🛠️ Tecnologias Utilizadas

[Next.js](https://nextjs.org/)       | Framework React para SSR/SSG e rotas modernas

[Material UI (MUI)](https://mui.com/)  | Biblioteca de componentes estilizados

[Firebase Auth](https://firebase.google.com/products/auth) | Autenticação com Google e email/senha

[Firebase Firestore](https://firebase.google.com/products/firestore) | Banco de dados em tempo real                     

[Firebase App Hosting](https://firebase.google.com/products/app-hosting) | Hospedagem com CI/CD automático                  

---

## 📦 Estrutura do Projeto

```bash

├── src/
│   ├── components/       # Componentes reutilizáveis (Chat, formulários, Header, etc.)
│   ├── app/              # Rotas da aplicação
│   │   ├── auth/         # Páginas de login, cadastro, recuperação de senha, etc.
│   │   └── dashboard/    # Páginas da aplicação com seleção dos jogos, chat em tempo real e perfil.
│   ├── lib/              # Serviços (auth, firestore, etc.)
│   ├── hooks/            # Hooks react customizados que são reaproveitados na aplicação
│   ├── contexts/         # Contextos react que são reaproveitados na aplicação
│   ├── config.ts         # Arquivo com as configurações da aplicação (env)
│   ├── paths.ts          # Arquivo com as rotas da aplicação
│   └── styles/           # Temas e estilos customizados
├── firebase.json         # Configuração do Firebase Hosting
├── .firebaserc           # Referência ao projeto Firebase
├── package.json
└── README.md
``` 
---
## 📦 Rodando em modo de desenvolvimento

Para rodar em modo de desenvolvimento, basta seguir as etapas:

### Criar o arquivo .env com as variáveis abaixo:
```
NEXT_PUBLIC_FIREBASE_API_KEY=your_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

⚠️ **ATENÇÃO** 
Para o funcionamento do chat, é necessário criar um index no firestore contendo a seguinte configuração:

``` gameId Crescente timestamp Decrescente __name__ Decrescente ```

### Clone o projeto
```
git clone https://github.com/willianbsz/game-stream-hub.git
cd game-stream-hub
```

### Instale as dependências
```
npm install --legacy-peer-deps
```

### Rode o servidor de desenvolvimento
```
npm run dev
```

---

## 🚀 Publicando alterações
O projeto é publico. Então, caso queiram fazer alterações, basta abrir uma PR apontada para a branch "main". Assim que aprovada, as alterações serão publicadas automáticamente.