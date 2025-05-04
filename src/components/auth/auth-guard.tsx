"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import Alert from "@mui/material/Alert";

import { paths } from "@/paths";
import { logger } from "@/lib/default-logger";
import { useAuthUser } from "@/hooks/use-auth-user";

import FullScreenLoading from "../loading/full-screen-loading";

export interface AuthGuardProps {
  children: React.ReactNode;
}

export function AuthGuard({
  children,
}: AuthGuardProps): React.JSX.Element | null {
  const router = useRouter();
  const { authUser, error, isLoading } = useAuthUser();
  const [isChecking, setIsChecking] = React.useState<boolean>(true);

  const checkPermissions = async (): Promise<void> => {
    logger.debug("[AuthGuard]: Checking permissions", {
      authUser,
      error,
      isLoading,
      isChecking,
    });

    if (isLoading) {
      logger.debug("[AuthGuard]: Still loading user");
      return;
    }

    if (error) {
      logger.debug("[AuthGuard]: Error loading user", error);
      setIsChecking(false);
      return;
    }

    if (!authUser) {
      logger.debug(
        "[AuthGuard]: User is not logged in, redirecting to sign in"
      );
      router.replace(paths.auth.signIn);
      return;
    }

    logger.debug("[AuthGuard]: User is logged in, rendering children");
    setIsChecking(false);
  };

  React.useEffect(() => {
    checkPermissions().catch(() => {
      // noop
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps -- Expected
  }, [authUser, error, isLoading]);

  if (isChecking) {
    return <FullScreenLoading />;
  }

  if (error) {
    return <Alert color="error">{error}</Alert>;
  }

  logger.debug("[AuthGuard]: User is logged in, rendering children");
  return <React.Fragment>{children}</React.Fragment>;
}
