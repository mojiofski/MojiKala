// app/(auth)/LoginLayout.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login - MojiKala",
  description: "Login page for MojiKala",
};

export default function LoginLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div>{children}</div>;
}
