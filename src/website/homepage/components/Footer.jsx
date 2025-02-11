import React from 'react';
import { Mail, ArrowRight, Facebook, Twitch, Linkedin, Youtube, Twitter } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-indigo-950 rounded-t-[40px]  sm:rounded-t-[100px] sm:pb-16 sm:px-20 px-10 text-gray-300 pt-[120px] ">
      <div className="max-w-7xl mx-auto">
        {/* Top Section */}
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {/* Logo and Social Links */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-6">
              {/* <div className="w-8 h-8 bg-emerald-500 rounded"></div> */}
              <span className="text-white text-2xl font-semibold">Voogyo</span>
            </div>
            <div className="sm:flex space-y-2  sm:space-y-0 gap-4">
              <Facebook icon="facebook"  className='w-5 sm:w-auto'/>
              <Twitter icon="twitter" className='w-5 sm:w-auto' />
              <Linkedin icon="linkedin" className='w-5 sm:w-auto' />
              <Youtube icon="youtube" className='w-5 sm:w-auto' />
            </div>
          </div>

          {/* Company Links */}
          <div className="lg:col-span-1">
            <h3 className="text-white text-xl font-semibold mb-4">Company</h3>
            <ul className="space-y-3">
              <FooterLink text="About" />
              <FooterLink text="Contact" />
              <FooterLink text="Pricing" />
              <FooterLink text="Features" />
            </ul>
          </div>

          {/* Blog Links */}
          <div className="lg:col-span-1">
            <h3 className="text-white text-xl font-semibold mb-4">Blog</h3>
            <ul className="space-y-3">
              <FooterLink text="Blog" />
              <FooterLink text="Blog Grid" />
              <FooterLink text="Blog Details" />
              <FooterLink text="Login" />
            </ul>
          </div>

          {/* Support Links */}
          <div className="lg:col-span-1">
            <h3 className="text-white text-xl font-semibold mb-4">Support</h3>
            <ul className="space-y-3">
              <FooterLink text="Support" />
              <FooterLink text="Privacy Policy" />
              <FooterLink text="Terms & Conditon" />
              <FooterLink text="Payment" />
            </ul>
          </div>
          {/* <div className="lg:col-span-1 sm:block hidden">
            <h3 className="text-white text-xl font-semibold mb-4">Subscribe Now</h3>
            <p className="mb-4">Subscribe to our newsletter *</p>
            <div className="flex">
              <div className="relative flex px-4 rounded-md py-2 border border-gray-100">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="email"
                  placeholder="Enter your Email.."
                  className="w-full  px-10 py-2 rounded-l outline-none"
                />
              <button className="bg-emerald-500 p-2 rounded-lg">
                <ArrowRight className="text-white" size={20} />
              </button>
              </div>
            </div>
          </div> */}
          {/* Newsletter */}
        </div>
          {/* <div className="lg:col-span-1 sm:hidden ">
            <h3 className="text-white text-xl font-semibold mb-4">Subscribe Now</h3>
            <p className="mb-4">Subscribe to our newsletter *</p>
            <div className="flex">
              <div className="relative flex px-4 rounded-md py-2 border border-gray-100">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="email"
                  placeholder="Enter your Email.."
                  className="w-full  px-10 py-2 rounded-l outline-none"
                />
              <button className="bg-emerald-500 p-2 rounded-lg">
                <ArrowRight className="text-white" size={20} />
              </button>
              </div>
            </div>
          </div> */}

        {/* Bottom Section */}
        <div className="pt-8 border-t pb-5 border-gray-700 flex flex-col md:flex-row justify-between items-center gap-4">
          <p>Copyright © 2024 Voogyo</p>
        
        </div>
      </div>
    </footer>
  );
};

// Helper Components
const SocialButton = ({ icon }) => (
  <button className="w-10 h-10 rounded-full bg-indigo-900 flex items-center justify-center hover:bg-emerald-500 transition-colors">
    <div className="w-5 h-5 bg-current rounded-sm"></div>
  </button>
);

const FooterLink = ({ text }) => (
  <li>
    <a href="#" className="hover:text-emerald-500 transition-colors">
      {text}
    </a>
  </li>
);

export default Footer;