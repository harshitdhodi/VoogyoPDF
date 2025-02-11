import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

export default function Footer() {
  const handleScroll = (id) => {
    const element = document.querySelector(`.${id}`);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-2xl font-bold mb-4">Voogyo</h3>
            <p className="text-gray-400">Simplifying travel for everyone.</p>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {["Features",  "About Us","Reviews", "Contact Us"].map((item) => (
                <li key={item}>
                  <button
                    onClick={() => {
                      if (item === "Features") handleScroll("how-work");
                      else if (item === "About Us") handleScroll("about-us");
                      else if (item === "Contact Us") handleScroll("contact-us");
                      else if (item === "Reviews") handleScroll("review");
                      else window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                    className="text-gray-400 hover:text-white transition-colors duration-200 focus:outline-none"
                  >
                    {item}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Legal</h4>
            <ul className="space-y-2">
              {["Terms of Service", "Privacy Policy", "Cookie Policy"].map((item) => (
                <li key={item}>
                  <button
                    onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                    className="text-gray-400 hover:text-white transition-colors duration-200 focus:outline-none"
                  >
                    {item}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Connect With Us</h4>
            <div className="flex space-x-4">
              {[
                { Icon: Facebook, name: "Facebook" },
                { Icon: Twitter, name: "Twitter" },
                { Icon: Instagram, name: "Instagram" },
                { Icon: Linkedin, name: "LinkedIn" },
              ].map(({ Icon, name }) => (
                <a
                  key={name}
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors duration-200"
                  aria-label={`Follow us on ${name}`}
                >
                  <Icon className="h-6 w-6" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 py-8 text-center">
          <p className="text-gray-400">
            &copy; {new Date().getFullYear()} Voogyo. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
