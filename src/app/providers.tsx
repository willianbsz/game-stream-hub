import { AuthUserProvider } from "@/contexts/auth/auth-user-context";

export function Providers({ children }: { children: React.ReactNode }) {
  return <AuthUserProvider>{children}</AuthUserProvider>;
}
