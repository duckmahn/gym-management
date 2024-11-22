"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Cookies from "js-cookie";
import { useTheme } from "next-themes";
import { useRouter, usePathname } from "next/navigation";
import { useTranslations } from "next-intl";

interface SidebarProps {
  active: string;
  onToggle?: (isOpen: boolean) => void;
}

interface SidebarItem {
  name: string;
  path: string;
}
export default function Sidebar({ active, onToggle }: SidebarProps) {
  const t = useTranslations("Sidebar");
  const [activeItem, setActiveItem] = useState<string>(active);
  const [isDropdownOpen, setDropdownOpen] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(true);
  const router = useRouter();
  const pathname = usePathname();
  const locale = pathname.split("/")[1];
  const { theme, setTheme } = useTheme();
  const [isThemeLoaded, setIsThemeLoaded] = useState(false);

  const handleItemClick = (item: string) => {
    setActiveItem(item);
  };

  const toggleSidebar = () => {
    const newIsOpen = !isOpen;
    setIsOpen(newIsOpen);
    if (onToggle) {
      onToggle(newIsOpen);
    }
  };

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    Cookies.set("theme", newTheme, { expires: 30 });
  };

  useEffect(() => {
    const savedTheme = Cookies.get("theme");
    if (savedTheme) {
      setTheme(savedTheme);
    }
    setIsThemeLoaded(true);
  }, [setTheme]);

  if (!isThemeLoaded) {
    return null;
  }

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };

  return (
    <div className="relative flex">
      <aside
        className={`fixed top-0 left-0 h-full shadow-lg transition-transform duration-300 ${
          theme === "dark"
            ? "bg-[#1F1F1F] text-white"
            : "bg-gray-50 text-gray-900"
        } flex flex-col justify-between items-center z-40 ${
          isOpen ? "w-[250px] translate-x-0" : "w-[80px] -translate-x-full"
        } p-6`}
      >
        {/* Toggle button */}
        <button
          onClick={toggleSidebar}
          className={`absolute top-5 -right-6 p-2 rounded-full shadow-md ${
            theme === "dark" ? "bg-gray-700 text-white" : "bg-white text-black"
          }`}
        >
          {isOpen ? "←" : "→"}
        </button>

        {/* Sidebar header */}
        <div className="text-center my-8">
          {isOpen ? (
            <h1 className="text-2xl font-bold">
              <span className="text-[#c21f37]">GYM</span>HUFLIT.
            </h1>
          ) : (
            <span className="text-[#c21f37] text-2xl font-bold">G</span>
          )}
        </div>

        <nav className="flex-1 w-full">
          <ul className="list-none p-0">
            {[
              { name: t("trainer"), path: "/huanluyenvien" },
              { name: t("manager"), path: "/quanly" },
              { name: t("facilities"), path: "/cosovatchat" },
              { name: t("customer"), path: "/khachhang" },
              { name: t("membership"), path: "/membership" },
            ].map((item: SidebarItem) => (
              <li key={item.name} className="w-full">
                <Link
                  href={`/${locale}${item.path}`}
                  className={`flex items-center gap-4 px-6 py-3 transition-colors rounded-md ${
                    activeItem === item.name
                      ? "bg-[#c21f37] text-white"
                      : theme === "dark"
                      ? "hover:bg-gray-700 text-white"
                      : "hover:bg-gray-200 text-gray-900"
                  }`}
                  onClick={() => handleItemClick(item.name)}
                >
                  {item.name}
                </Link>
              </li>
            ))}
            <li className="w-full">
              <button
                className={`flex items-center justify-between px-6 py-3 w-full transition-colors rounded-md ${
                  theme === "dark"
                    ? "hover:bg-gray-700 text-white"
                    : "hover:bg-gray-200 text-gray-900"
                }`}
                onClick={toggleDropdown}
              >
                {t("setting")}
              </button>
              {isDropdownOpen && isOpen && (
                <ul className="mt-2 ml-6">
                  <li>
                    <button
                      className={`flex items-center gap-3 px-4 py-2 text-sm rounded-md transition-colors ${
                        theme === "dark"
                          ? "text-white hover:bg-gray-700"
                          : "text-gray-900 hover:bg-gray-200"
                      }`}
                      onClick={toggleTheme}
                    >
                      {t("theme")}: {theme === "dark" ? "light" : "dark"}
                    </button>
                  </li>
                  <li>
                    <button
                      className={`flex items-center gap-3 px-4 py-2 text-sm rounded-md transition-colors ${
                        theme === "dark"
                          ? "text-white hover:bg-gray-700"
                          : "text-gray-900 hover:bg-gray-200"
                      }`}
                      onClick={() => {
                        const newLocale = locale === "en" ? "vi" : "en";
                        router.push(`/${newLocale}${pathname.substring(3)}`);
                      }}
                    >
                      {t("language")}:{" "}
                      {locale === "en" ? "Vietnamese" : "Tiếng Anh"}
                    </button>
                  </li>
                </ul>
              )}
            </li>
          </ul>
        </nav>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className={`w-full py-3 text-lg transition-colors ${
            theme === "dark"
              ? "bg-[#6C575AFF] hover:bg-[#c21f37]"
              : "bg-[#c21f37] hover:bg-[#a1182e] text-white"
          }`}
        >
          {isOpen && t("logout")}
        </button>
      </aside>
    </div>
  );
}
