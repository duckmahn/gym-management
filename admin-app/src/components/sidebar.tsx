"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useTheme } from "next-themes";

interface SidebarProps {
  active: string;
}

interface SidebarItem {
  name: string;
  path: string;
}

export default function Sidebar({ active }: SidebarProps) {
  const [activeItem, setActiveItem] = useState<string>(active);
  const [isDropdownOpen, setDropdownOpen] = useState<boolean>(false);

  const { theme, setTheme } = useTheme();

  const handleItemClick = (item: string) => {
    setActiveItem(item);
  };

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <aside
      className={`w-[250px] p-5 flex flex-col justify-between items-center ${
        theme === "dark" ? "bg-[#141414] text-white" : "bg-gray-100 text-black"
      }`}
    >
      <div className="text-2xl font-bold mb-10 tracking-wide text-center">
        <span className="text-[#c21f37]">GYM</span>HUFLIT.
      </div>
      <nav className="flex-1 w-full -mt-2.5">
        <ul className="list-none p-0 w-full">
          <li>
            <span className="bg-[#c21f37] py-2.5 px-4 rounded-lg block mb-5">
              <i className="fas fa-th-large"></i> Quản lý
            </span>
          </li>
          {[
            { name: "Lịch Tập", path: "lichtap" },
            { name: "Huấn Luyện Viên", path: "huanluyenvien" },
            { name: "Tài Chính", path: "taichinh" },
            { name: "Cơ Sở Vật Chất", path: "cosovatchat" },
            { name: "Khách Hàng", path: "khachhang" },
            { name: "Gói Thành Viên", path: "membership" },
          ].map((item: SidebarItem) => (
            <li key={item.name}>
              <Link
                href={`/${item.path}`}
                className={`block mb-5 text-base py-2.5 px-4 rounded-lg transition duration-300 ${
                  activeItem === item.name
                    ? "bg-[#c21f37]"
                    : "hover:bg-gray-700"
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
              <i className="fas fa-cog"></i> Cài Đặt
            </span>
            {isDropdownOpen && (
              <ul className="list-none p-0">
                <li>
                  <button
                    className={`block py-2 px-4 cursor-pointer ${
                      theme === "dark"
                        ? "text-white hover:bg-gray-700"
                        : "text-black hover:bg-gray-300"
                    }`}
                    onClick={toggleTheme}
                  >
                    <i className="fas fa-adjust"></i> Đổi Theme:{" "}
                    {theme === "dark" ? "light" : "dark"}
                  </button>
                </li>
              </ul>
            )}
          </li>
        </ul>
      </nav>
      <button className="w-full py-2.5 bg-[#c21f37] border-none text-white cursor-pointer rounded-lg">
        <i className="fas fa-sign-out-alt"></i> Đăng xuất
      </button>
    </aside>
  );
}
