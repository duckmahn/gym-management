'use client';

import React, { useState } from 'react';
import { format, addMonths, subMonths, getDaysInMonth } from 'date-fns'; 
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
  const [selectedDate, setSelectedDate] = useState<number | null>(null);
  const [currentDate, setCurrentDate] = useState(new Date());

  const handleSidebarToggle = (isOpen: boolean) => {
    setIsSidebarOpen(isOpen);
    console.log('Sidebar is now', isOpen ? 'open' : 'closed');
  };
  const handleDateClick = (day: number) => {
    setSelectedDate(day);
  };

  const handleNextMonth = () => {
    setCurrentDate(addMonths(currentDate, 1));
  };

  const handlePreviousMonth = () => {
    setCurrentDate(subMonths(currentDate, 1));
  };

  const currentMonth = format(currentDate, 'MMMM yyyy');
  const daysInMonth = getDaysInMonth(currentDate); 

  return (
    <div className="flex h-screen overflow-hidden">
      
      <Sidebar active="quan-ly" onToggle={handleSidebarToggle} />

   
      <main className={`flex-1 p-6 bg-gray-50 transition-all duration-300 ${isSidebarOpen ? 'ml-[250px]' : 'ml-0'}`}>
        
        <Header />

        
        <div className="flex space-x-6 mt-6">
          
          <div className="flex-1 bg-white shadow-lg rounded-lg p-6">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">Thông báo</h2>
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
          </div>

          
          <div className="w-[400px] bg-white shadow-lg rounded-lg p-6">
            <div className="flex justify-between items-center mb-4">
              <button className="text-gray-800 font-bold" onClick={handlePreviousMonth}>
                Previous &lt;
              </button>
              <h2 className="text-2xl font-bold text-gray-800">{currentMonth}</h2>
              <button className="text-gray-800 font-bold" onClick={handleNextMonth}>
                Next &gt;
              </button>
            </div>
            <div className="grid grid-cols-7 gap-4 text-gray-800">
              <div className="text-center text-base font-bold">SUN</div>
              <div className="text-center text-base font-bold">MON</div>
              <div className="text-center text-base font-bold">TUE</div>
              <div className="text-center text-base font-bold">WED</div>
              <div className="text-center text-base font-bold">THU</div>
              <div className="text-center text-base font-bold">FRI</div>
              <div className="text-center text-base font-bold">SAT</div>
              
              {[...Array(daysInMonth)].map((_, index) => {
                const day = index + 1;
                return (
                  <div
                    key={index}
                    className={`text-center p-2 rounded cursor-pointer text-base font-bold ${
                      selectedDate === day ? 'bg-blue-300' : ''
                    }`}
                    onClick={() => handleDateClick(day)}
                  >
                    {day}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
