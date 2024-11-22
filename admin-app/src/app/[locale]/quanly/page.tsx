"use client";

import React, { useState, useEffect } from "react";
import Sidebar from "@/app/[locale]/components/sidebar";
import Header from "@/app/[locale]/components/header";
import { Calendar } from "@/app/[locale]/components/ui/calendar";
import { useSchedule } from "@/hooks/useSchedule";
import { useTheme } from "next-themes";
import { useTranslations } from "next-intl";
import Cookies from "js-cookie";

export default function ManagementPage(): JSX.Element {
  const t = useTranslations("ManagementPage");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [token, setToken] = useState<string | null>(null);
  const [searchDate, setSearchDate] = useState<Date | undefined>(new Date());
  const { schedule, getSchedule } = useSchedule(token);
  const { theme, setTheme } = useTheme();
  const [isThemeLoaded, setIsThemeLoaded] = useState(false);

  const handleDayClick = async (date: Date) => {
    const dateData = date;
    setSearchDate(new Date(dateData.setDate(dateData.getDate())));
    await getSchedule(dateData);
  };

  useEffect(() => {
    setToken(localStorage.getItem("token"));
  }, []);

  useEffect(() => {
    if (searchDate) {
      getSchedule(new Date(searchDate));
    }
  }, [searchDate, getSchedule]);

  useEffect(() => {
    const savedTheme = Cookies.get("theme");
    if (savedTheme) {
      setTheme(savedTheme);
    }
    setIsThemeLoaded(true);
  }, [setTheme]);

  useEffect(() => {
    if (theme) {
      Cookies.set("theme", theme);
    }
  }, [theme]);

  if (!isThemeLoaded) {
    return null;
  }

  return (
    <div
      className={`flex h-screen overflow-hidden ${
        theme === "dark" ? "bg-gray-900" : "bg-gray-100"
      }`}
    >
      {/* Sidebar */}
      <Sidebar active="quan-ly" onToggle={setIsSidebarOpen} />
      <main
        className={`flex-1 p-6 transition-all duration-300 ${
          isSidebarOpen ? "ml-[250px]" : "ml-0"
        } ${
          theme === "dark" ? "bg-gray-800 text-white" : "bg-gray-50 text-black"
        }`}
      >
        {/* Header */}
        <Header />

        {/* Main Content */}
        <div className="flex space-x-6 mt-6">
          {/* Notifications Section */}
          <div
            className={`flex-1 shadow-lg rounded-lg p-6 ${
              theme === "dark"
                ? "bg-gray-700 text-white"
                : "bg-white text-black"
            }`}
          >
            <h2 className="text-2xl font-semibold mb-4">{t("notify")}</h2>
            <table className="w-full text-left">
              <thead>
                <tr
                  className={`border-b ${
                    theme === "dark"
                      ? "bg-gray-700 text-white"
                      : "bg-gray-100 text-black"
                  }`}
                >
                  <th className="px-4 py-2">{t("date")}</th>
                  <th className="px-4 py-2">{t("trainer")}</th>
                  <th className="px-4 py-2">{t("location")}</th>
                  <th className="px-4 py-2">{t("room")}</th>
                </tr>
              </thead>
              <tbody>
                {schedule &&
                  schedule.map((item, index) => (
                    <tr
                      key={index}
                      className={`border-b ${
                        theme === "dark" ? "text-white" : "text-black"
                      }`}
                    >
                      <td className="px-4 py-2">
                        {new Date(item.date).toLocaleDateString("vi-VN", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </td>
                      <td className="px-4 py-2">{item.trainerId}</td>
                      <td className="px-4 py-2">{item.location}</td>
                      <td className="px-4 py-2">{item.roomId}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>

          {/* Calendar Section */}
          <div
            className={`w-72 shadow-lg rounded-lg p-6 ${
              theme === "dark"
                ? "bg-gray-700 text-white"
                : "bg-white text-black"
            }`}
          >
            <Calendar
              mode="single"
              selected={searchDate}
              onSelect={(date) => handleDayClick(date || new Date())}
              className={`rounded-md border ${
                theme === "dark" ? "border-gray-600" : "border-gray-200"
              }`}
            />
          </div>
        </div>
      </main>
    </div>
  );
}
