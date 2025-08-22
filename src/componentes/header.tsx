"use client";
import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
export default function Header() {
  const sample = {
    title: "DON'T CLOSE YOUR EYES",
    href: "/blog/dont-close-your-eyes",
    excerpt:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    imageUrl:
      "https://cdn.pixabay.com/photo/2016/10/05/17/26/indian-1717192_960_720.jpg",
    category: "ART & LIFE",
    author: "Jakob Groberg",
    date: new Date(),
    readingTime: "1 Min",
  };
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const navItems = [
    { name: "Inicio", href: "/" },
    { name: "Blog", href: "/blog" },
    { name: "Categorías", href: "/categorias" },
    { name: "Acerca", href: "/acerca" },
  ];

  return (
    <header className="w-full border-b border-gray-200 bg-white">
      <div className="max-w-11/12 mx-auto px-4 border-b">
        <div className="h-14 flex items-center justify-between">
          <Link
            href="/"
            className="text-lg font-semibold tracking-tight text-black"
          >
            Mi Blog
          </Link>

          <nav className="hidden md:flex items-center gap-6 text-sm">
            {navItems.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`transition-colors ${
                    active ? "text-black" : "text-gray-600 hover:text-black"
                  }`}
                >
                  {item.name}
                </Link>
              );
            })}
          </nav>

          <button
            aria-label="Abrir menú"
            className="md:hidden p-2 rounded border border-gray-300 text-gray-700"
            onClick={() => setOpen(!open)}
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>

        {open && (
          <nav className="md:hidden pb-3">
            <ul className="flex flex-col gap-2 border-t border-gray-200 pt-3">
              {navItems.map((item) => {
                const active = pathname === item.href;
                return (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className={`block px-1 py-1 text-sm ${
                        active ? "text-black" : "text-gray-600 hover:text-black"
                      }`}
                      onClick={() => setOpen(false)}
                    >
                      {item.name}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        )}
      </div>
      {/* Header Section */}
      <div className="border-b border-black">
        <div className="text-center py-4">
          <h1 className="text-[180px] font-bold -tracking-tight text-black uppercase p-7">
            {sample.category}
          </h1>
        </div>

        {/* News Ticker */}
        <div className="bg-black text-white py-2 px-4 overflow-hidden">
          <div className="whitespace-nowrap animate-marquee">
            <span className="inline-block">
              NEWS TICKER+++ {sample.author.substring(0, 100)} +++{" "}
              {sample.excerpt.substring(0, 100)} +++
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
