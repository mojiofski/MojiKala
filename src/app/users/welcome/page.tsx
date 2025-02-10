import Link from "next/link";
import React from "react";
import Image from "next/image";
const WelcomePage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full gap-2 max-w-lg mx-auto">
      <div className="flex flex-col items-center justify-center w-full shadow-lg rounded-lg bg-white p-4 gap-8">
        <div className="relative w-full h-24">
          <Image
            src={"/Digikala-png-2.png"}
            alt=""
            fill
            priority
            className="object-contain p-2"
          />
        </div>
        <p className="flex text-3xl items-center justify-center gap-2">
          <span className="text-gray-600 text-4xl">Welcome to </span>
          <span className="text-red-500 font-semibold text-4xl">MojiKala</span>
        </p>
        <p className="text-center text-gray-600 text-lg">
          Now you are a MojiKala member and more than 100 different products are
          available to you
        </p>
        <button className="bg-red-500 px-4 py-2 shadow-lg rounded-lg text-white">
          <Link href={"/"}>Go back to MojiKala</Link>
        </button>
        <Link href={"/profile/personal-info"}>
          <p className="text-center text-red-500 underline">
            Complete your information
          </p>
        </Link>
      </div>
    </div>
  );
};

export default WelcomePage;
