"use client";

import { supabase } from "@/lib/supabaseClient";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const router = useRouter();

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.error("❌error", error.message);
      setMessage(error.message);
    } else {
      console.log("✅ login successfull!", data);
      console.log("🟢 Session:", data.session);
      console.log("🟢 User:", data.session?.user);

      setMessage("✅ login successfull!");
      router.push("/");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full h-screen gap-4">
      <h2 className="flex gap-2 items-center justify-center">
        <span className="text-gray-500 text-2xl">Login to</span>
        <span className="text-red-500 font-semibold text-2xl">MojiKala</span>
      </h2>
      <form
        onSubmit={handleSignIn}
        className="flex flex-col gap-4 bg-white rounded-lg shadow-lg w-full max-w-lg p-4"
      >
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="p-2 bg-gray-100"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="p-2 bg-gray-100"
        />
        <button
          className="bg-red-500 text-white p-2 rounded-lg w-1/2 mx-auto"
          type="submit"
        >
          Login
        </button>
      </form>
      <div className="mt-2 text-gray-600">
        <p>
          <span>{`Are you haven't an account? `}</span>
          <span className="text-black font-semibold">
            <Link href={"/signup"} className="text-blue-500 underline">
              Sign up now!
            </Link>
          </span>
        </p>
      </div>
      {message && <p className="text-red-500">{message}</p>}
    </div>
  );
}
