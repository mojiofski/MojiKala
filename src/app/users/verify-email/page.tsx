"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

export default function VerifyEmail() {
  const [message, setMessage] = useState("verifing email...");
  const router = useRouter();

  useEffect(() => {
    const verifyEmail = async () => {
      const { data, error } = await supabase.auth.getSession();

      if (error) {
        setMessage("❌ error in get user data");
        console.error("Error getting session:", error.message);
        return;
      }

      if (data?.session) {
        setMessage("✅ Your email has been verified");
        setTimeout(() => router.push("/"), 3000);
      } else {
        setMessage(
          "⚠️Your email has not been verified yet! Please click on the email verification link in your email."
        );
      }
    };

    verifyEmail();
  }, [router]);

  return (
    <div className="flex flex-col items-center justify-center h-screen text-center p-6">
      <h1 className="text-2xl font-bold text-gray-700">Verifing email</h1>
      <p className="text-gray-600 mt-2">{message}</p>
    </div>
  );
}
