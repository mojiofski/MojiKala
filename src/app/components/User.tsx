import Link from "next/link";
import React from "react";
import { CiLogin } from "react-icons/ci";
const User = () => {
  return (
    <Link href={"/user"}>
      <div className=" flex items-center text-gray-700 border px-2 py-1 rounded-lg ml-6">
        <div className="">
          <CiLogin className="text-2xl font-bold " />
        </div>
        <span className="ml-3 text-sm"> Login | SignUp </span>
      </div>
    </Link>
  );
};

export default User;
