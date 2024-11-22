// Sidebar.tsx
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

interface SidebarProps {
  active: string;
  onToggle?: (isOpen: boolean) => void;
}

interface SidebarItem {
  name: string;
  path: string;
}

export default function Sidebar({ active, onToggle = () => {} }: SidebarProps) {
  const [activeItem, setActiveItem] = useState<string>(active);
  const [isOpen, setIsOpen] = useState<boolean>(true);
  
  const router = useRouter();


  const handleItemClick = (item: string) => {
    setActiveItem(item);
  };

  const toggleSidebar = () => {
    const newIsOpen = !isOpen;
    setIsOpen(newIsOpen);
    onToggle(newIsOpen); 
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    router.push('/login');
  };

  return (

    <div className="relative flex">
      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full transition-transform duration-300 bg-[#141414] text-white flex flex-col justify-between items-center z-40 ${
          isOpen ? 'w-[250px] translate-x-0' : 'w-0 -translate-x-full'
        }`}
      >
        
        <button
          onClick={toggleSidebar}
          className="absolute top-0 right-[-35px] p-1 bg-[#282828] text-white rounded-full z-50"
          style={{ width: '30px', height: '30px' }}
        >
          <FontAwesomeIcon icon={faBars} />
        </button>

        {isOpen && (
          <>
            <div className="text-2xl font-bold mb-10 tracking-wide text-center mt-10">
              <span className="text-[#c21f37]">GYM</span>HUFLIT.
            </div>

            <nav className="flex-1 w-full mt-5">
              <ul className="list-none p-0 w-full flex flex-col items-center">
                {[
                  { name: 'Quản Lý', path: 'quanly' },
                  { name: 'Sức Khỏe', path: 'suckhoe' },
                  { name: 'Huấn Luyện Viên', path: 'huanluyenvien' },
                  { name: 'Hội Viên', path: 'hoivien' },
                  { name: 'Cơ Sở Vật Chất', path: 'cosovatchat' },
                  { name: 'Khách Hàng', path: 'khachhang' },
                  { name: 'Cài Đặt', path: 'caidat' },
                ].map((item: SidebarItem) => (
                  <li key={item.name} className="text-left w-full">
                    <Link
                      href={`/${item.path}`}
                      className={`block mb-5 text-white text-lg py-2.5 px-4 rounded-lg transition duration-300 ${
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

            
            <button
              onClick={handleLogout}
              className="w-full py-2.5 bg-[#c21f37] border-none text-white cursor-pointer rounded-lg text-lg"
            >
              <i className="fas fa-sign-out-alt"></i> Đăng xuất
            </button>
          </>
        )}
      </aside>
    </div>

  );
}
