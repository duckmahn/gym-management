// Dashboard.tsx
'use client';

import React from 'react';
import Sidebar from '@/components/sidebar';
import Header from '@/components/header';

export default function dashboard(): JSX.Element {
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar active="dashboard" />
      <main className="flex-grow p-5">
        <Header />
        <div className="p-5 bg-white rounded-lg shadow-md h-full flex justify-center items-center">
          <h1 className="text-center">Chào mừng đến với Dashboard!</h1>
        </div>
      </main>
    </div>
  );
}
