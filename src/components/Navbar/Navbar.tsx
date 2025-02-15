import { Link } from "react-router-dom";
import logo from "/images/logo.png";
import { underlineHoverEffect } from "../../styles/reusableStyles";

const Navbar = () => {
  return (
    <nav className="flex absolute top-1 justify-between items-center w-full md:px-24 px-4 bg-zinc-900 h-16 border-b-[#ff5630] border-b-1 z-50">
      <div>
        <Link to="/">
          <img src={logo} alt="Logo" className="md:h-8 h-6" />
        </Link>
      </div>
      <div className="flex text-[18px] md:text-[20px] font-medium md:gap-10 gap-4 ">
        <Link to="/" className={underlineHoverEffect}>
          Films
        </Link>
        <Link to="/plans" className={underlineHoverEffect}>
          Planning
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
