import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faInstagram,
  faTwitter,
  faLinkedin,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import { Link } from "react-router-dom";
import React from "react";

const FooterSection = () => {
  return (
    <footer className="border-t border-gray-200 py-20 bg-white">
      <div className="max-w-6xl mx-auto px-6 sm:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* Brand */}
          <div className="mb-6 md:mb-0">
            <Link to="/" className="text-2xl font-bold text-red-700">
              Barks&<span className="text-red-500">Whiskers</span>
            </Link>
          </div>

          {/* Navigation Links */}
          <nav className="mb-6 md:mb-0">
            <ul className="flex flex-wrap justify-center gap-6 text-sm text-gray-600">
              <li>
                <Link to="/about">About Us</Link>
              </li>
              <li>
                <Link to="/contact">Contact</Link>
              </li>
              <li>
                <Link to="/faq">FAQ</Link>
              </li>
              <li>
                <Link to="/privacy">Privacy</Link>
              </li>
              <li>
                <Link to="/terms">Terms</Link>
              </li>
            </ul>
          </nav>

          {/* Social Icons */}
          <div className="flex space-x-4">
            <a href="#" aria-label="Facebook">
              <FontAwesomeIcon icon={faFacebook} className="h-5 w-5 text-gray-600 hover:text-red-500" />
            </a>
            <a href="#" aria-label="Instagram">
              <FontAwesomeIcon icon={faInstagram} className="h-5 w-5 text-gray-600 hover:text-red-500" />
            </a>
            <a href="#" aria-label="Twitter">
              <FontAwesomeIcon icon={faTwitter} className="h-5 w-5 text-gray-600 hover:text-red-500" />
            </a>
            <a href="#" aria-label="LinkedIn">
              <FontAwesomeIcon icon={faLinkedin} className="h-5 w-5 text-gray-600 hover:text-red-500" />
            </a>
            <a href="#" aria-label="YouTube">
              <FontAwesomeIcon icon={faYoutube} className="h-5 w-5 text-gray-600 hover:text-red-500" />
            </a>
          </div>
        </div>

        {/* Footer Bottom Text */}
        <div className="mt-10 text-center text-sm text-gray-500 space-y-2">
          <p>© 2025 Barks&Whiskers. All rights reserved.</p>
          <div className="flex justify-center space-x-4">
            <Link to="/privacy" className="hover:underline">Privacy Policy</Link>
            <Link to="/terms" className="hover:underline">Terms of Service</Link>
            <Link to="/cookies" className="hover:underline">Cookie Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
