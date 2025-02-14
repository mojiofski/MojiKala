"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const router = useRouter();
  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();
    if (res.ok) {
      router.push("/users/verify-email");
    }
    setMessage(data.message);
  };

  return (
    <div className="flex flex-col items-center justify-center w-full h-screen gap-4">
      <h2 className="flex gap-2 items-center justify-center">
        <span className="text-gray-500 text-2xl">Register to</span>
        <span className="text-red-500 font-semibold text-2xl">MojiKala</span>
      </h2>
      <form
        onSubmit={handleSignUp}
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
          placeholder="Passwrod"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="p-2 bg-gray-100"
        />
        <button
          className="bg-red-500 text-white p-2 rounded-lg w-1/2 mx-auto"
          type="submit"
        >
          Register
        </button>
      </form>
      <div className="mt-2 text-gray-600">
        <p>
          <span>{`Are you have an MojiKala account? `}</span>
          <span className="text-black font-semibold">
            <Link href={"/signin"} className="text-blue-500 underline">
              Sign In
            </Link>
          </span>
        </p>
      </div>

      {message && <p className="text-red-500">{message}</p>}
    </div>
  );
}
