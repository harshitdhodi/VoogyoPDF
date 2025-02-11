import { useEffect } from "react";
import logo from "../../images/l1.png";
import { X } from "lucide-react";
function MobileMenu({ isMenuOpen, setIsMenuOpen }) {
  // Prevent scrolling when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  }, [isMenuOpen]);

  return (
    <div className="relative">
      {/* Overlay Backdrop - Prevents content from showing through */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[9998] transition-opacity duration-300"
          onClick={() => setIsMenuOpen(false)} // Clicking outside closes the menu
        ></div>
      )}

      {/* Mobile Menu */}
      <div
        className={`lg:hidden fixed inset-y-0 left-0 w-3/4 max-w-xs bg-red-800 transition-transform duration-300 z-[9999] shadow-xl ${
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
    </div>
  );
}

export default MobileMenu;
