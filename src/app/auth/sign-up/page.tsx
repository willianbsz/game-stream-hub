import * as React from "react";
import type { Metadata } from "next";

import { SignUpForm } from "@/components/auth/sign-up-form";

export const metadata = {
  title: `Criar conta - Game Stream Hub`,
  description: `Crie sua conta de acesso ao Game Stream Hub`,
} satisfies Metadata;

export default function Page(): React.JSX.Element {
  return <SignUpForm />;
}
