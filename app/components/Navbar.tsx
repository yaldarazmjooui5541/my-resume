"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "next-themes";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { theme, setTheme } = useTheme();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Handle body overflow when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMenuOpen]);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "#about", label: "About" },
    { href: "#skills", label: "Skills" },
    { href: "#projects", label: "Projects" },
  ];

  if (!mounted) return null;

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className={`fixed w-full z-50 transition-all duration-500 ${
          scrolled
            ? "py-4 bg-white/80 dark:bg-black/80 backdrop-blur-md shadow-lg"
            : "py-6 bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="relative group">
              <motion.span
                className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-purple-500"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                AM
              </motion.span>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-purple-500/50 group-hover:w-full transition-all duration-300" />
            </Link>

            {/* Controls */}
            <div className="flex items-center gap-4">
              {/* Theme Toggle */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="transition-colors"
              >
                {theme === "dark" ? (
                  <motion.svg
                    initial={{ rotate: -30 }}
                    animate={{ rotate: 0 }}
                    className="w-7 h-7 text-yellow-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                      clipRule="evenodd"
                    />
                  </motion.svg>
                ) : (
                  <motion.svg
                    initial={{ rotate: 30 }}
                    animate={{ rotate: 0 }}
                    className="w-5 h-5 text-purple-600"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                  </motion.svg>
                )}
              </motion.button>

              {/* Menu Button */}
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 transition-colors"
              >
                <div className="w-6 h-6 flex flex-col justify-center gap-1.5">
                  <span
                    className={`block w-6 h-0.5 bg-black dark:bg-gray-300 transition-all duration-300 ${
                      isMenuOpen ? "rotate-45 translate-y-2" : ""
                    }`}
                  />
                  <span
                    className={`block w-6 h-0.5 bg-black dark:bg-gray-300 transition-all duration-300 ${
                      isMenuOpen ? "opacity-0" : ""
                    }`}
                  />
                  <span
                    className={`block w-6 h-0.5 bg-black dark:bg-gray-300 transition-all duration-300 ${
                      isMenuOpen ? "-rotate-45 -translate-y-2" : ""
                    }`}
                  />
                </div>
              </motion.button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/*Menu Overlay*/}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* Backdrop Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-md"
              style={{
                zIndex: 49, // Just below navbar
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
              }}
              onClick={() => setIsMenuOpen(false)}
            />

            {/* Menu Content */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 h-screen w-full sm:w-80 bg-white dark:bg-black shadow-2xl border-l border-gray-400/5"
              style={{
                zIndex: 51, // Above navbar
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="min-h-screen flex flex-col">
                {/* Menu Header */}
                <div className="p-6 border-b border-purple-500/10 dark:border-purple-500/5">
                  <div className="flex items-center justify-between">
                    <h2 className="text-lg font-semibold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-purple-500">
                      Navigation
                    </h2>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setIsMenuOpen(false)}
                      className="p-2 rounded-full hover:bg-purple-500/10 transition-colors"
                    >
                      <svg
                        className="w-6 h-6 text-gray-600 dark:text-gray-300"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </motion.button>
                  </div>
                </div>

                {/* Menu Links */}
                <nav className="flex-1 overflow-y-hidden py-6 px-4 no-scrollbar">
                  <div className="grid gap-2 overflow-y-hidden no-scrollbar">
                    {navLinks.map((link, index) => (
                      <motion.div
                        key={link.label}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="overflow-hidden no-scrollbar"
                      >
                        <Link
                          href={link.href}
                          className="group relative flex items-center p-4 text-gray-800 dark:text-gray-200 rounded-xl transition-all duration-300 hover:bg-purple-500/5 dark:hover:bg-purple-900/10 no-scrollbar"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          {/* Animated Dot Indicator */}
                          <span className="absolute left-0 w-1 h-8 rounded-r-full bg-purple-500 scale-y-0 group-hover:scale-y-100 transition-transform origin-left" />

                          {/* Link Content */}
                          <div className="flex items-center gap-4 ml-2">
                            {/* you can add icons guys if you want ......for each link here */}
                            <span className="w-2 h-2 rounded-full bg-purple-500/50 group-hover:scale-150 transition-transform" />

                            {/* Label with hover effect */}
                            <span className="text-lg font-medium group-hover:translate-x-1 transition-transform no-scrollbar">
                              {link.label}
                            </span>
                          </div>
                        </Link>
                      </motion.div>
                    ))}
                  </div>
                </nav>

                {/* Menu Footer */}
                <div className="p-6 border-t border-purple-500/10 dark:border-purple-500/5">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      © 2024 Arthur Morgan
                    </span>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() =>
                        setTheme(theme === "dark" ? "light" : "dark")
                      }
                      className="p-2 rounded-full bg-purple-500/10 hover:bg-purple-500/20 transition-colors"
                    >
                      {theme === "dark" ? (
                        <motion.svg
                          initial={{ rotate: -30 }}
                          animate={{ rotate: 0 }}
                          className="w-5 h-5 text-yellow-500"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                            clipRule="evenodd"
                          />
                        </motion.svg>
                      ) : (
                        <motion.svg
                          initial={{ rotate: 30 }}
                          animate={{ rotate: 0 }}
                          className="w-5 h-5 text-purple-600"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                        </motion.svg>
                      )}
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
