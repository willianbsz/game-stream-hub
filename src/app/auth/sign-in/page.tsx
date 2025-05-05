import * as React from "react";
import type { Metadata } from "next";

import { SignInForm } from "@/components/auth/sign-in-form";

export const metadata = {
  title: `Entrar - Game Stream Hub`,
  description: `Entre na sua conta de acesso ao Game Stream Hub`,
} satisfies Metadata;

export default function Page(): React.JSX.Element {
  return <SignInForm />;
}
