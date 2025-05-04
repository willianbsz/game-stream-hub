"use client";

import * as React from "react";
import { onAuthStateChanged } from "firebase/auth";
import type { Auth } from "firebase/auth";

import type { AuthUser } from "@/types/user";
import { getFirebaseAuth } from "@/lib/auth/client";
import { logger } from "@/lib/default-logger";

import type { AuthUserContextValue } from "./types";

export const AuthUserContext = React.createContext<
  AuthUserContextValue | undefined
>(undefined);

export interface UserProviderProps {
  children: React.ReactNode;
}

export function AuthUserProvider({
  children,
}: UserProviderProps): React.JSX.Element {
  const [firebaseAuth] = React.useState<Auth>(getFirebaseAuth());

  const [state, setState] = React.useState<
    Omit<AuthUserContextValue, "signOut">
  >({
    authUser: null,
    error: null,
    isLoading: true,
  });

  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(firebaseAuth, async (user) => {
      logger.debug("[Auth] onAuthStateChanged:", user);

      setState((prevState) => ({
        ...prevState,
        authUser: user
          ? ({
              id: user.uid,
              email: user.email ?? undefined,
              name: user.displayName ?? undefined,
              avatar: user.photoURL ?? undefined,
            } satisfies AuthUser)
          : null,
        error: null,
        isLoading: false,
      }));
    });

    return () => {
      unsubscribe();
    };
  }, [firebaseAuth]);

  const signOut = React.useCallback(async () => {
    setState((prevState) => ({
      ...prevState,
      isLoading: true,
    }));

    try {
      await firebaseAuth.signOut();
    } catch (error) {
      logger.error("[Auth] signOut error:", error);
      setState((prevState) => ({
        ...prevState,
        error: "Error signing out",
        isLoading: false,
      }));
    }
  }, [firebaseAuth]);

  return (
    <AuthUserContext.Provider value={{ ...state, signOut }}>
      {children}
    </AuthUserContext.Provider>
  );
}

export const AuthUserConsumer = AuthUserContext.Consumer;
