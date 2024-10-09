// Header.tsx
'use client';

import React from 'react';

export default function Header(): JSX.Element {
  return (
    <header style={styles.header}>
      <div style={styles.searchWrapper}>
        <div style={styles.notificationIcon}>
          <i className="fas fa-bell" style={{ color: '#c21f37' }}></i>
        </div>
        <input
          style={styles.searchBar}
          type="text"
          placeholder="Search here"
        />
      </div>
    </header>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px',
    position: 'relative',
  },
  notificationIcon: {
    fontSize: '24px',
    marginRight: '10px',
  },
  searchWrapper: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    justifyContent: 'center',
    position: 'relative',
  },
  searchBar: {
    width: '400px',
    padding: '10px',
    borderRadius: '20px',
    border: '1px solid #ccc',
    paddingLeft: '40px',
    background: `url('data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 fill=%22%23666%22 viewBox=%220 0 24 24%22%3E%3Cpath d=%22M15.5 14h-.79l-.28-.27a6.5 6.5 0 1 0-.92.92l.27.28v.79l5 4.99L20.49 19l-4.99-5zM10 14a4 4 0 1 1 0-8 4 4 0 0 1 0 8z%22/%3E%3C/svg%3E') no-repeat left 10px center`,
    backgroundSize: '20px',
  },
};
