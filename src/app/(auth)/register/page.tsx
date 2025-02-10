"use client";

import React, { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import Link from "next/link";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { register } = useAuth();
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      if (!email || !password) {
        setError("please enter your email and password");
        return;
      }
      await register(email, password);
      router.push("/users/welcome");
    } catch (err) {
      setError("error,please try again");
      console.error("Login Error: ", err);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full gap-2 max-w-xl mx-auto">
      <p className="flex text-3xl items-center justify-center gap-2 ">
        <span className="text-gray-600 text-2xl">Sign Up to</span>
        <span className="text-red-500 font-semibold text-4xl">MojiKala</span>
      </p>
      <form
        onSubmit={handleRegister}
        className="flex flex-col gap-4 p-6 shadow-lg rounded-md bg-white w-full"
      >
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="p-2 border border-gray-300 rounded-md"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="p-2 border border-gray-300 rounded-md"
        />
        {error && <div className="text-red-500 text-sm mt-2">{error}</div>}
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
        >
          Sign In
        </button>
        {/* Oder Way Signing */}
      </form>
      <div className="mt-2 text-gray-600">
        <p>
          <span>{`Are you have an MojiKala account? `}</span>
          <span className="text-black font-semibold">
            <Link href={"/login"} className="text-blue-500 underline">
              Sign In
            </Link>
          </span>
        </p>
      </div>
    </div>
  );
};

export default Register;
