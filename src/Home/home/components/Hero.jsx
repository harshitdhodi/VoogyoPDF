import { useEffect } from "react";
import { gsap } from "gsap";
import hero from "../images/herosec3.png";
import { Link } from "react-router-dom";
import { Play } from "lucide-react";
import bgImg from "../images/bgImg.jpg";

export default function Page() {
  useEffect(() => {
    // GSAP animations for smooth load and transition
    gsap.fromTo(
      ".fade-in",
      { opacity: 0, y: 50 }, // Start state
      {
        opacity: 1,
        y: 0,
        duration: 1.5,
        ease: "power2.out",
      }
    );

    gsap.fromTo(
      ".fade-in-img",
      { opacity: 0, scale: 0.8 }, // Start state for image
      {
        opacity: 1,
        scale: 1,
        duration: 1.5,
        ease: "power2.out",
        delay: 0.5, // Add delay for a smooth effect
      }
    );
  }, []);

  return (
    <div className="sm:min-h-screen relative">
    {/* Background Image with Overlay */}
    <div className="absolute inset-0 z-0 w-full">
      <img
        src={bgImg}
        alt="Background"
        fill
        className="object-cover h-[50vh] sm:h-[100vh] w-full"
        priority
      />
      <div className="absolute inset-0 bg-sky-400/70" /> {/* Reduced opacity overlay */}
    </div>

    {/* Content */}
    <div className="relative z-10">
      {/* Navigation */}
      <nav className="container mx-auto px-4 py-6 flex items-center justify-between fade-in">
        <Link href="/" className="text-white w-12 h-12">
          <h2 className="font-bold text-3xl ">Voogyo</h2>
        </Link>
      </nav>

      {/* Hero Section */}
      <main className="container mx-auto px-4 py-12 md:py-24 grid md:grid-cols-2 gap-12 items-center">
        <div className="space-y-8 fade-in">
          <h1 className="text-white text-xl md:text-6xl font-bold leading-tight">
            WE ARE BUILDING
            <br />
            <span className="text-2xl md:text-7xl">SOFTWARE</span> TO HELP
          </h1>

          <p className="text-white/90 text-sm sm:text-lg max-w-xl">
            Voogyo is a travel agency software that streamlines bookings, itineraries, and customer management with an intuitive, all-in-one platform. It enhances efficiency with automated workflows, real-time pricing, and seamless integrations.
          </p>

          <div className="flex items-center gap-6">
            <Link
              href="#"
              className="bg-white text-sky-400 shadow-lg px-8 py-3 rounded-lg font-medium transition duration-300 ease-in-out hover:bg-sky-400 hover:text-white hover:shadow-xl"
            >
              Start Your Journey
            </Link>
          </div>
        </div>

        <div className="relative hidden sm:block fade-in-img">
          <img
            src={hero}
            alt="Dashboard Preview"
            width={800}
            height={600}
            className="sm:w-full h-auto"
            priority
          />

          {/* Decorative Elements */}
          <div className="absolute hidden sm:block -bottom-24 left-0 right-0 h-24 bg-gradient-to-b from-sky-400/50 to-transparent" />
        </div>
      </main>
    </div>
  </div>

  );
}
