"use client";

import DesktopMenu from "./DesktopMenu";
import MobileMenu from "./MobileMenu";
import SearchBar from "./SearchBar";
import { useAuth } from "@/context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();
  return (
    <nav className="">
      {/* Desktop Menu */}
      <div className="">
        <DesktopMenu user={user} logout={logout} />
      </div>
      {/* Moblie Menu */}
      <div>
        <SearchBar />
        <MobileMenu />
      </div>
    </nav>
  );
};

export default Navbar;
