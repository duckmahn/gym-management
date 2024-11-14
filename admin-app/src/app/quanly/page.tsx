'use client';

import React, { useState } from 'react';  // Đảm bảo useState được import từ React
import { format } from 'date-fns';
import Sidebar from '../../components/sidebar';
import Header from '../../components/header';

export default function ManagementPage(): JSX.Element {
  const events = [
    { date: '03/07/2021', name: 'Keza Ana', type: 'Casual leave', time: '5:55PM', status: 'Approved' },
    { date: '01/07/2022', name: 'Hirwa Patrick', type: 'Late entry', time: '6:00PM', status: 'Rejected' },
    { date: '27/06/2022', name: 'Mugabo Peter', type: 'Paternity leave', time: '7:30AM', status: 'Pending' },
    { date: '27/06/2022', name: 'Amata', type: 'Paternity leave', time: '9:00AM', status: 'Approved' },
  ];

  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const currentMonth = format(new Date(), 'MMMM yyyy');

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <Sidebar active="quan-ly" onToggle={setIsSidebarOpen} />

      {/* Main content */}
      <main className={`flex-1 p-6 bg-gray-50 transition-all duration-300 ${isSidebarOpen ? 'ml-[250px]' : 'ml-0'}`}>
        {/* Header */}
        <Header />

        {/* Main content layout */}
        <div className="flex space-x-6 mt-6">
          {/* Thông báo */}
          <div className="flex-1 bg-white shadow-lg rounded-lg p-6">
            <h2 className="text-2xl font-semibold mb-4">Thông báo</h2>
            <table className="w-full text-left text-gray-700">
              <thead>
                <tr>
                  <th className="px-4 py-2">Ngày</th>
                  <th className="px-4 py-2">Người gửi</th>
                  <th className="px-4 py-2">Loại</th>
                  <th className="px-4 py-2">Giờ</th>
                </tr>
              </thead>
              <tbody>
                {events.map((event, index) => (
                  <tr key={index} className="border-t">
                    <td className="px-4 py-2">{event.date}</td>
                    <td className="px-4 py-2">{event.name}</td>
                    <td className="px-4 py-2">{event.type}</td>
                    <td className="px-4 py-2">{event.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="mt-4">
              <span className="text-blue-500">Approved</span>
              <span className="text-red-500 ml-2">Rejected</span>
              <span className="text-yellow-500 ml-2">Pending</span>
            </div>
          </div>

          {/* Lịch */}
          <div className="w-72 bg-white shadow-lg rounded-lg p-6">
            <h2 className="text-2xl font-semibold mb-4">{currentMonth}</h2>
            <div className="grid grid-cols-7 gap-2">
              <div className="text-center text-sm font-semibold">SUN</div>
              <div className="text-center text-sm font-semibold">MON</div>
              <div className="text-center text-sm font-semibold">TUE</div>
              <div className="text-center text-sm font-semibold">WED</div>
              <div className="text-center text-sm font-semibold">THU</div>
              <div className="text-center text-sm font-semibold">FRI</div>
              <div className="text-center text-sm font-semibold">SAT</div>
              {/* Lịch ngày */}
              {[...Array(30)].map((_, index) => (
                <div
                  key={index}
                  className={`text-center p-2 ${index % 2 === 0 ? 'bg-red-200' : ''} rounded cursor-pointer`}
                >
                  {index + 1}
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
