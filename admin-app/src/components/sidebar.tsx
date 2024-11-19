// Sidebar.tsx
'use client';

import React, { useState } from 'react';
import Link from 'next/link';

interface SidebarProps {
  active: string;
}

interface SidebarItem {
  name: string;
  path: string;
}

export default function Sidebar({ active }: SidebarProps) {
  const [activeItem, setActiveItem] = useState<string>(active);

  const handleItemClick = (item: string) => {
    setActiveItem(item);
  };

  return (
    <aside className="w-[250px] bg-[#141414] text-white p-5 flex flex-col justify-between items-center">
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
          {[{ name: 'Lịch Tập', path: 'lichtap' },
            { name: 'Huấn Luyện Viên', path: 'huanluyenvien' },
            { name: 'Tài Chính', path: 'taichinh' },
            { name: 'Cơ Sở Vật Chất', path: 'cosovatchat' },
            { name: 'Khách Hàng', path: 'khachhang' },
            { name: 'Cài Đặt', path: 'caidat' }].map((item: SidebarItem) => (
            <li key={item.name}>
              <Link
                href={`/${item.path}`}
                className={`block mb-5 text-white text-base py-2.5 px-4 rounded-lg transition duration-300 ${
                  activeItem === item.name ? 'bg-[#c21f37]' : 'hover:bg-gray-700'
                }`}
                onClick={() => handleItemClick(item.name)}
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <button className="w-full py-2.5 bg-[#c21f37] border-none text-white cursor-pointer rounded-lg">
        <i className="fas fa-sign-out-alt"></i> Đăng xuất
      </button>
    </aside>
  );
}
