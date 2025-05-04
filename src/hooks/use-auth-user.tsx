import * as React from "react";

import { AuthUserContext } from "@/contexts/auth/auth-user-context";
import type { AuthUserContextValue } from "@/contexts/auth/types";

export function useAuthUser(): AuthUserContextValue {
  const context = React.useContext(AuthUserContext);

  if (!context) {
    throw new Error("useAuthUser must be used within a AuthUserProvider");
  }

  return context;
}
