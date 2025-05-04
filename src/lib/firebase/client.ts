"use client";

import { initializeApp } from "firebase/app";
import type { FirebaseApp } from "firebase/app";

// import { connectAuthEmulator, getAuth } from 'firebase/auth';

import { config } from "@/config";

// This executes on the client only, so we can cache the app instance.
let appInstance: FirebaseApp;

export function getFirebaseApp(): FirebaseApp {
  if (appInstance) {
    return appInstance;
  }

  appInstance = initializeApp({
    apiKey: config.firebase.apiKey,
    authDomain: config.firebase.authDomain,
    projectId: config.firebase.projectId,
    storageBucket: config.firebase.storageBucket,
    messagingSenderId: config.firebase.messagingSenderId,
    appId: config.firebase.appId,
  });

  // if (process.env.NODE_ENV === 'development') {
  //   connectAuthEmulator(getAuth(getFirebaseApp()), 'http://192.168.15.184:9099', { disableWarnings: true });
  // }

  return appInstance;
}
