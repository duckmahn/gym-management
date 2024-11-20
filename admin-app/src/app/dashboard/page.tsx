// Dashboard.tsx
'use client';

import React, { useState } from 'react';
import Sidebar from '@/components/sidebar';
import Header from '@/components/header';

export default function dashboard(): JSX.Element {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar active="dashboard" onToggle={(isOpen) => setIsSidebarOpen(isOpen)} />
      <main className={`flex-grow p-5 transition-all duration-300 ${
          isSidebarOpen ? 'ml-[250px]' : 'ml-0'
        }`}>
        <Header />
        <div className="p-5 bg-white rounded-lg shadow-md h-full flex justify-center items-center">
          <h1 className="text-center">Chào mừng đến với Dashboard!</h1>
        </div>
      </main>
    </div>
  );
}
