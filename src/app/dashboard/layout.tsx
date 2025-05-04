import * as React from "react";

import { AuthGuard } from "@/components/auth/auth-guard";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps): React.JSX.Element {
  return <AuthGuard>{children}</AuthGuard>;
}
