"use client";

import React, { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import { FaFacebookF } from "react-icons/fa";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { loading, user, login, loginWithGoogle } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && user) {
      router.push("/");
    }
  }, [user, loading, router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      if (!email || !password) {
        setError("Please enter your email and password.");
        return;
      }
      await login(email, password);
      router.push("/");
    } catch (err) {
      setError("Login error! Please try again");
      console.error("Login Error: ", err);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full gap-2 max-w-xl mx-auto">
      <p className="flex text-3xl items-center justify-center gap-2">
        <span className="text-gray-600 text-2xl">Sign In to</span>
        <span className="text-red-500 font-semibold text-4xl">MojiKala</span>
      </p>
      <form
        onSubmit={handleLogin}
        className="flex flex-col gap-4 p-6 shadow-lg rounded-md bg-white w-full"
      >
        <input
          type="email"
          placeholder="Email"
          autoComplete="email"
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
        <div className="flex  items-center justify-center gap-4">
          <button
            onClick={loginWithGoogle}
            className="mt-4 bg-red-400 text-white px-4 py-3 rounded-full flex items-center justify-center gap-2"
          >
            <span className="text-3xl">
              <FcGoogle />
            </span>
            <p className="text-white font-semibold"> Sign in with Google</p>
          </button>
          <button
            onClick={loginWithGoogle}
            className="mt-4 bg-blue-400 text-white px-4 py-3 rounded-full flex items-center justify-center gap-2"
          >
            <span className="text-3xl text-white">
              <FaFacebookF />
            </span>
            <p className="text-white font-semibold">Sign in with FaceBook</p>
          </button>
        </div>
      </form>
      <div className="mt-2 text-gray-600">
        <p>
          <span>{`Are you haven't an account? `}</span>
          <span className="text-black font-semibold">
            <Link href={"/register"} className="text-blue-500 underline">
              Sign up now!
            </Link>
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
