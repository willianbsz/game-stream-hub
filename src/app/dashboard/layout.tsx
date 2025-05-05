import * as React from "react";
import type { Metadata } from "next";

import { AuthGuard } from "@/components/auth/auth-guard";

interface LayoutProps {
  children: React.ReactNode;
}

export const metadata = {
  title: `Dashboard - Game Stream Hub`,
  description: `Dashboard do Game Stream Hub`,
} satisfies Metadata;

export default function Layout({ children }: LayoutProps): React.JSX.Element {
  return <AuthGuard>{children}</AuthGuard>;
}
