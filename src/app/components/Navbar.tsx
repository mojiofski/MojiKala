
import DesktopMenu from "./DesktopMenu";
import MobileMenu from "./MobileMenu";
import SearchBar from "./SearchBar";


const Navbar = () => {
  return (
    
    <nav className="">
      {/* Desktop Menu */}
      <div className="">
        <DesktopMenu />
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
