import { LogLevel } from "@/lib/logger";

export interface Config {
  logLevel: keyof typeof LogLevel;
  firebase: {
    apiKey?: string;
    appId?: string;
    authDomain?: string;
    messagingSenderId?: string;
    projectId?: string;
    storageBucket?: string;
    clientEmail?: string;
    privateKey?: string;
    serviceAccount?: string;
  };
}

export const config = {
  firebase: {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    clientEmail: process.env.NEXT_FIREBASE_ADMIN_CLIENT_EMAIL,
    privateKey: process.env.NEXT_FIREBASE_ADMIN_PRIVATE_KEY,
    serviceAccount: process.env.NEXT_FIREBASE_ADMIN_SERVICE_ACCOUNT,
  },
} satisfies Config;
