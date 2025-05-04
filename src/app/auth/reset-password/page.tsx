import * as React from "react";
import type { Metadata } from "next";

import { ResetPasswordForm } from "@/components/auth/reset-password-form";

export const metadata = {
  title: `Recuperar senha`,
} satisfies Metadata;

export default function Page(): React.JSX.Element {
  return <ResetPasswordForm />;
}
