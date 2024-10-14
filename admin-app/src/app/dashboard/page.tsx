// Dashboard.tsx
'use client';

import React from 'react';
import Sidebar from '../../components/sidebar';
import Header from '../../components/header';

export default function dashboard(): JSX.Element {
  return (
    <div style={styles.container}>
      <Sidebar active="dashboard" />
      <main style={styles.mainContent}>
        <Header />
        <div style={styles.content}>
          <h1 style={{ textAlign: 'center' }}>Chào mừng đến với Dashboard!</h1>
        </div>
      </main>
    </div>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    display: 'flex',
    height: '100vh',
    backgroundColor: '#f4f4f4',
  },
  mainContent: {
    flexGrow: 1,
    padding: '20px',
  },
  content: {
    padding: '20px',
    backgroundColor: 'white',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
};
