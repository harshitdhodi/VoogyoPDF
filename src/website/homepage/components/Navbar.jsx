import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { Menu, X } from "lucide-react";
import logo from "../../images/l1.png";
import FreeDemoModal from "@/website/demoForm/DemoForm";

export function Navbar() {
  const [isSticky, setIsSticky] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems = ["About Us", "Features", "Pricing", "Products", "Contact us"];

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > window.innerHeight * 0.1) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      {/* Navbar Container */}
      <div
        className={`fixed top-0 left-0 w-full transition-all duration-300 z-50 ${
          isSticky ? "bg-white py-3 shadow-md" : "bg-transparent py-4"
        } flex items-center justify-between px-6 lg:px-10`}
        style={{ position: "relative" }} // Ensures correct stacking
      >
        <nav className="flex w-full  mx-auto items-center justify-between">
          {/* Logo */}
          <a href="/" className="flex items-center gap-2">
            <img src={logo} alt="Logo" className="w-auto h-[8vh] object-contain" />
          </a>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center gap-8 text-[16px]">
            <a href="/" className="text-[#32B768]">
              Home
            </a>
            {menuItems.map((item) => (
              <a
                key={item}
                href={`/${item.toLowerCase().replace(" ", "-")}`}
                className="text-gray-600 hover:text-gray-900"
              >
                {item}
              </a>
            ))}
          </div>

          {/* Free Demo Button */}
          <div className="hidden lg:flex items-center gap-4">
            <FreeDemoModal />
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden text-gray-700 z-50 relative"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </nav>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <>
          {/* Overlay Backdrop */}
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
            onClick={() => setIsMenuOpen(false)}
          ></div>

          {/* Mobile Menu Panel */}
          <div
            className={`lg:hidden fixed inset-y-0 left-0 w-3/4 max-w-xs bg-red-800 transition-transform duration-300 z-50 shadow-lg ${
              isMenuOpen ? "translate-x-0" : "-translate-x-full"
            }`}
          >
            <div className="flex justify-between items-center p-6 border-b">
              <a href="/">
                <img src={logo} alt="Logo" className="h-[8vh] object-contain" />
              </a>
              <button className="text-white" onClick={() => setIsMenuOpen(false)}>
                <X size={28} />
              </button>
            </div>

            <div className="flex flex-col items-center gap-6 mt-6 text-lg">
              <a href="/" className="text-[#32B768]" onClick={() => setIsMenuOpen(false)}>
                Home
              </a>
              {menuItems.map((item) => (
                <a
                  key={item}
                  href={`/${item.toLowerCase().replace(" ", "-")}`}
                  className="text-white hover:text-gray-200"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item}
                </a>
              ))}
              <div className="mt-4">
                <FreeDemoModal />
              </div>
            </div>
          </div>
        </>
      )}

      <Outlet />
    </>
  );
}
