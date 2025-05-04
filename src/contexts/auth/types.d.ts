import type { AuthUser } from "@/types/user";

export interface AuthUserContextValue {
  authUser: AuthUser | null;
  error: string | null;
  isLoading: boolean;
  signOut: () => Promise<void>;
}
