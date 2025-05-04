import * as React from "react";
import type { Metadata } from "next";

import { SignInForm } from "@/components/auth/sign-in-form";

export const metadata = {
  title: `Sign in `,
} satisfies Metadata;

export default function Page(): React.JSX.Element {
  return <SignInForm />;
}
