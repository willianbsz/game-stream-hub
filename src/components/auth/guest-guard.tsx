"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import Alert from "@mui/material/Alert";

import { paths } from "@/paths";
import { logger } from "@/lib/default-logger";
import { useAuthUser } from "@/hooks/use-auth-user";

import FullScreenLoading from "../loading/full-screen-loading";

export interface GuestGuardProps {
  children: React.ReactNode;
}

export function GuestGuard({
  children,
}: GuestGuardProps): React.JSX.Element | null {
  const router = useRouter();
  const { authUser, error, isLoading } = useAuthUser();
  const [isChecking, setIsChecking] = React.useState<boolean>(true);

  const checkPermissions = async (): Promise<void> => {
    logger.debug("[GuestGuard]: Checking permissions", {
      authUser,
      error,
      isLoading,
      isChecking,
    });

    if (isLoading) {
      logger.debug("[GuestGuard]: Still loading user", error);
      return;
    }

    if (error) {
      logger.debug("[GuestGuard]: Error loading user", error);
      setIsChecking(false);
      return;
    }

    if (authUser) {
      logger.debug("[GuestGuard]: User is logged in, redirecting to dashboard");
      router.replace(paths.app.home);
      return;
    }

    logger.debug("[GuestGuard]: User is not logged in, rendering children");
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

  return <React.Fragment>{children}</React.Fragment>;
}
