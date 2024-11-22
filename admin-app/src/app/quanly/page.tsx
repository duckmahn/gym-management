"use client";

import React, { useState, useEffect } from "react";
import Sidebar from "../../components/sidebar";
import Header from "../../components/header";
import { Calendar } from "@/app/[locale]/components/ui/calendar";
import { useSchedule } from "@/hooks/useSchedule";

export default function ManagementPage(): JSX.Element {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [token, setToken] = useState<string | null>(null);
  const [searchDate, setSearchDate] = useState<Date | undefined>(new Date());
  const { schedule, getSchedule } = useSchedule(token);

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

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar active="quan-ly" onToggle={setIsSidebarOpen} />
      <main
        className={`flex-1 p-6 bg-gray-50 transition-all duration-300 ${
          isSidebarOpen ? "ml-[250px]" : "ml-0"
        }`}
      >
        <Header />

        <div className="flex space-x-6 mt-6">
          <div className="flex-1 bg-white shadow-lg rounded-lg p-6">
            <h2 className="text-2xl font-semibold mb-4">Thông báo</h2>
            <table className="w-full text-left text-gray-700">
              <thead>
                <tr>
                  <th className="px-4 py-2">Ngày</th>
                  <th className="px-4 py-2">Trainer</th>
                  <th className="px-4 py-2">Location</th>
                  <th className="px-4 py-2">Room</th>
                </tr>
              </thead>
              <tbody>
                {schedule &&
                  schedule?.map((item, index) => (
                    <tr key={index}>
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

          <div className="w-72 bg-white shadow-lg rounded-lg p-6">
            <Calendar
              mode="single"
              selected={searchDate}
              onSelect={(date) => handleDayClick(date || new Date())}
              className="rounded-md border"
            />
          </div>
        </div>
      </main>
    </div>
  );
}