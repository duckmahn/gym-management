"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { useRouter, usePathname } from "next/navigation";
import { useTranslations } from "next-intl";

interface SidebarProps {
  active: string;
  onToggle: (isOpen: boolean) => void;
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
  const locale = pathname.split("/")[1]; // Lấy locale từ pathname
  const { theme, setTheme } = useTheme();

  const handleItemClick = (item: string) => {
    setActiveItem(item);
  };

  const toggleSidebar = () => {
    const newIsOpen = !isOpen;
    setIsOpen(newIsOpen);
    onToggle(newIsOpen);
  };

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme); // Cập nhật theme
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };

  return (
    <div className="relative flex">
      <aside
        className={`fixed top-0 left-0 h-full transition-transform duration-300 ${
          theme === "dark" ? "bg-[#141414] text-white" : "bg-white text-black"
        } flex flex-col justify-between items-center z-40 ${
          isOpen ? "w-[250px] translate-x-0" : "w-0 -translate-x-full"
        }`}
      >
        <button
          onClick={toggleSidebar}
          className="absolute top-5 left-5 p-1 bg-[#282828] text-white rounded-full z-50"
          style={{ width: "30px", height: "30px" }}
        >
          {isOpen ? "←" : "→"}
        </button>

        {isOpen && (
          <>
            <div className="text-2xl font-bold mb-10 tracking-wide text-center mt-10">
              <span className="text-[#c21f37]">GYM</span>HUFLIT.
            </div>

            <nav className="flex-1 w-full mt-5">
              <ul className="list-none p-0 w-full flex flex-col items-center">
                {[
                  { name: t("schedule"), path: "/lichtap" },
                  { name: t("trainer"), path: "/huanluyenvien" },
                  { name: t("manager"), path: "/quanly" },
                  { name: t("facilities"), path: "/cosovatchat" },
                  { name: t("customer"), path: "/khachhang" },
                  { name: t("membership"), path: "/membership" },
                ].map((item: SidebarItem) => (
                  <li key={item.name} className="text-left w-full">
                    <Link
                      href={`/${locale}${item.path}`}
                      className={`block mb-5 text-lg py-2.5 px-4 rounded-lg transition duration-300 ${
                        activeItem === item.name
                          ? "bg-[#c21f37]"
                          : theme === "dark"
                          ? "hover:bg-gray-700 text-white"
                          : "hover:bg-gray-300 text-black"
                      }`}
                      onClick={() => handleItemClick(item.name)}
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
                <li>
                  <span
                    className="bg-[#c21f37] py-2.5 px-4 rounded-lg block mb-5 cursor-pointer"
                    onClick={toggleDropdown}
                  >
                    <i className="fas fa-cog"></i> {t("setting")}
                  </span>
                  {isDropdownOpen && (
                    <ul className="list-none p-0">
                      <li>
                        <button
                          className={`block py-2 px-4 cursor-pointer transition-none ${
                            theme === "dark"
                              ? "text-white hover:bg-gray-700"
                              : "text-black hover:bg-gray-300"
                          }`}
                          onClick={toggleTheme}
                        >
                          <i className="fas fa-adjust"></i> {t("theme")}:{" "}
                          {theme === "dark" ? "light" : "dark"}
                        </button>
                      </li>
                      <li>
                        <button
                          className={`block py-2 px-4 cursor-pointer transition-none ${
                            theme === "dark"
                              ? "text-white hover:bg-gray-700"
                              : "text-black hover:bg-gray-300"
                          }`}
                          onClick={() => {
                            const newLocale = locale === "en" ? "vi" : "en"; // Chuyển đổi giữa tiếng Anh và tiếng Việt
                            router.push(`/${newLocale}${pathname.substring(3)}`); // Cập nhật đường dẫn
                          }}
                        >
                          <i className="fas fa-language"></i> {t("language")}: {locale === "en" ? "Tiếng Việt" : "English"}
                        </button>
                      </li>
                    </ul>
                  )}
                </li>
              </ul>
            </nav>

            <button
              onClick={handleLogout}
              className="w-full py-2.5 bg-[#6C575AFF] border-none text-white cursor-pointer rounded-lg text-lg"
            >
              <i className="fas fa-sign-out-alt"></i> {t("logout")}
            </button>
          </>
        )}
      </aside>
    </div>
  );
}
