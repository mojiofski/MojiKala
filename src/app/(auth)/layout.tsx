// app/auth/layout.tsx
"use client";

import LoginLayout from "@/components/LoginLayout";
import React from "react";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <LoginLayout>{children}</LoginLayout>
    </div>
  );
};

export default AuthLayout;
