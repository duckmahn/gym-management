// Sidebar.tsx
'use client';

import React, { useState, CSSProperties } from 'react';
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
    <aside style={styles.sidebar}>
      <div style={styles.logo}>
        <span style={styles.gymRed}>GYM</span>HUFLIT.
      </div>
      <nav style={styles.navContainer}>
        <ul style={styles.navList}>
          <li>
            <span style={styles.activeItem}>
              <i className="fas fa-th-large" style={styles.icon}></i> Quản lý
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
                style={{
                  ...styles.navItem,
                  ...(activeItem === item.name ? styles.selectedItem : {})
                }}
                onClick={() => handleItemClick(item.name)}
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <button style={styles.logoutButton}>
        <i className="fas fa-sign-out-alt" style={styles.icon}></i> Đăng xuất
      </button>
    </aside>
  );
}

const styles: { [key: string]: CSSProperties } = {
  
  sidebar: {
    width: '250px',
    backgroundColor: '#141414',
    color: '#fff',
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logo: {
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '40px',
    letterSpacing: '1px',
    textAlign: 'center',
  },
  gymRed: {
    color: '#c21f37',
  },
  navContainer: {
    flex: 1,
    width: '100%',
    marginTop: '-10px',
  },
  navList: {
    listStyleType: 'none',
    padding: 0,
    width: '100%',
  },
  navItem: {
    display: 'block',
    marginBottom: '20px',
    color: '#fff',
    textDecoration: 'none',
    fontSize: '16px',
    padding: '10px 15px',
    borderRadius: '8px',
    transition: 'background 0.3s',
  },
  activeItem: {
    backgroundColor: '#c21f37',
    padding: '10px 15px',
    borderRadius: '8px',
    display: 'block',
    marginBottom: '20px',
  },
  selectedItem: {
    backgroundColor: '#c21f37',
    color: '#fff',
  },
  logoutButton: {
    width: '100%',
    padding: '10px',
    backgroundColor: '#c21f37',
    border: 'none',
    color: 'white',
    cursor: 'pointer',
    borderRadius: '8px',
  },
};
