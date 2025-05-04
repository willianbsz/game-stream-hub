import * as React from "react";
import type { Metadata } from "next";

import { SignUpForm } from "@/components/auth/sign-up-form";

export const metadata = {
  title: `Sign up `,
} satisfies Metadata;

export default function Page(): React.JSX.Element {
  return <SignUpForm />;
}
