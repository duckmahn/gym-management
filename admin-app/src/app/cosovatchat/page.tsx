// CSVC.tsx
'use client';

import React from 'react';
import Sidebar from '../../components/sidebar';
import Header from '../../components/header';

export default function CSVCVaThietBi(): JSX.Element {
  return (
    <div style={styles.container}>
      <Sidebar active="csvc-va-thiet-bi" />
      <main style={styles.mainContent}>
        <Header />
        <div style={styles.content}>
          <div style={styles.headerSection}>
            <h2 style={styles.title}>Danh sách thiết bị và csvc</h2>
            <button style={styles.addButton}>Thêm CSVC và thiết bị</button>
          </div>
          <div style={styles.cardContainer}>
            <div style={styles.card}>
              <h3 style={styles.cardTitle}>Máy Chạy 1</h3>
              <hr style={styles.divider} />
              <div style={styles.cardDetails}>
                <p style={styles.detailText}>Thiết Bị Tập</p>
                <p style={styles.detailTextGray}>Loại</p>
                <p style={styles.detailText}><strong>$25000</strong></p>
                <p style={styles.detailTextGray}>Giá</p>
              </div>
              <div style={styles.cardActions}>
                <button style={styles.detailButton}>
                  Chi Tiết <span style={styles.arrow}>→</span>
                </button>
                <div style={styles.iconGroup}>
                  <i className="fas fa-edit" style={styles.iconEdit}></i>
                  <i className="fas fa-trash" style={styles.iconDelete}></i>
                </div>
              </div>
            </div>
            {/* More cards can be added here */}
          </div>
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
  },
  headerSection: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px',
  },
  title: {
    fontSize: '24px',
    fontWeight: '600',
    color: '#333',
  },
  addButton: {
    padding: '10px 20px',
    backgroundColor: '#c21f37',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
  },
  cardContainer: {
    display: 'flex',
    gap: '20px',
  },
  card: {
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '12px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    textAlign: 'left',
    minWidth: '250px',
  },
  cardTitle: {
    fontSize: '18px',
    fontWeight: '600',
    marginBottom: '10px',
    color: '#666',
  },
  divider: {
    border: 'none',
    borderTop: '1px solid #ccc',
    margin: '10px 0',
  },
  cardDetails: {
    marginBottom: '20px',
  },
  detailText: {
    fontSize: '16px',
    color: '#000',
    margin: '5px 0',
  },
  detailTextGray: {
    fontSize: '14px',
    color: '#999',
    marginBottom: '5px',
  },
  cardActions: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  detailButton: {
    padding: '10px 15px',
    backgroundColor: '#c21f37',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
  },
  arrow: {
    marginLeft: '5px',
    fontSize: '16px',
  },
  iconGroup: {
    display: 'flex',
    alignItems: 'center',
  },
  iconEdit: {
    color: '#c21f37',
    cursor: 'pointer',
    marginRight: '10px',
  },
  iconDelete: {
    color: 'red',
    cursor: 'pointer',
  },
};

