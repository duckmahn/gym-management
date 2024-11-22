// Dashboard.tsx
"use client";

import React, { useEffect, useState } from "react";
import Sidebar from "@/app/[locale]/components/sidebar";
import Header from "@/app/[locale]/components/header";
import { useTranslations } from "next-intl";
import { useTheme } from "next-themes";
import Cookies from "js-cookie";

export default function Dashboard(): JSX.Element {
  const t = useTranslations("dashboard");
  const { theme, setTheme } = useTheme();
  const [isThemeLoaded, setIsThemeLoaded] = useState(false);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    Cookies.set("theme", newTheme, { expires: 30 }); // Lưu theme vào cookie
  };

  useEffect(() => {
    const savedTheme = Cookies.get("theme");
    if (savedTheme) {
      setTheme(savedTheme); // Đọc theme từ cookie
    }
    setIsThemeLoaded(true); // Đánh dấu rằng theme đã được tải
  }, [setTheme]);

  if (!isThemeLoaded) {
    return <></>; // Không render gì cho đến khi theme được xác định
  }

  return (
    <div
      className={`flex h-screen ${
        theme === "dark" ? "bg-gray-900" : "bg-gray-100"
      }`}
    >
      <Sidebar active="dashboard" onToggle={() => {}} />
      <main className="flex-grow p-5">
        <Header />
        <div
          className={`p-5 rounded-lg shadow-md h-full flex justify-center items-center ${
            theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-black"
          }`}
        >
          <h1 className="text-center">{t("title")}</h1>
        </div>
      </main>
    </div>
  );
}
