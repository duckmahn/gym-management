// Header.tsx
'use client';

import React from 'react';

export default function Header(): JSX.Element {
  return (
    <header className="flex justify-between items-center mb-5 relative">
      <div className="flex items-center justify-center w-full relative">
        <div className="text-2xl mr-2.5">
          <i className="fas fa-bell text-[#c21f37]"></i>
        </div>
        <input
          className="w-[400px] p-2.5 rounded-full border border-gray-300 pl-10 bg-no-repeat bg-left bg-center bg-[url('data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 fill=%22%23666%22 viewBox=%220 0 24 24%22%3E%3Cpath d=%22M15.5 14h-.79l-.28-.27a6.5 6.5 0 1 0-.92.92l.27.28v.79l5 4.99L20.49 19l-4.99-5zM10 14a4 4 0 1 1 0-8 4 4 0 0 1 0 8z%22/%3E%3C/svg%3E')]"
          type="text"
          placeholder="Search here"
        />
      </div>
    </header>
  );
}
