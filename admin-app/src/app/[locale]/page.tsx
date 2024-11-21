// Dashboard.tsx
"use client";

import React from "react";
import Sidebar from "@/app/[locale]/components/sidebar";
import Header from "@/app/[locale]/components/header";
import { useTranslations } from "next-intl";
import { useTheme } from 'next-themes';

export default function dashboard(): JSX.Element {
  
  const t = useTranslations("dashboard");
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <div className={`flex h-screen ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-100'}`}>
      <Sidebar active="dashboard" onToggle={() => {}} />
      <main className="flex-grow p-5">
        <Header />
        <button onClick={toggleTheme} className="mb-4 p-2 bg-blue-500 text-white rounded">
          Switch to {theme === 'light' ? 'dark' : 'light'} mode
        </button>
        <div className={`p-5 rounded-lg shadow-md h-full flex justify-center items-center ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-black'}`}>
          <h1 className="text-center">{t("title")}</h1>
        </div>
      </main>
    </div>
  );
}
