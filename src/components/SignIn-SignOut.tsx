import Link from "next/link";
import React from "react";
import { CiLogin } from "react-icons/ci";

const SignInSignOut = () => {
  return (
    <Link href={"/signin"}>
      <div className=" flex items-center text-gray-700 border px-2 py-1 rounded-lg ml-6">
        <div className="">
          <CiLogin className="text-2xl font-bold " />
        </div>
        <span className="ml-3 text-sm"> SignIn | SignUp </span>
      </div>
    </Link>
  );
};

export default SignInSignOut;
