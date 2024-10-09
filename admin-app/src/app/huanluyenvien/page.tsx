// HuanLuyenVien.tsx
'use client';

import React from 'react';
import Sidebar from '../../components/sidebar';
import Header from '../../components/header';

export default function HuanLuyenVien(): JSX.Element {
  return (
    <div style={styles.container}>
      <Sidebar active="huan-luyen-vien" />
      <main style={styles.mainContent}>
        <Header />
        <div style={styles.content}>
          <div style={styles.headerSection}>
            <h2 style={styles.title}>Danh sách HLV</h2>
            <button style={styles.addButton}>Thêm huấn luyện viên</button>
          </div>
          <table style={styles.table}>
            <thead>
              <tr style={styles.tableHeader}>
                <th style={styles.headerText}>Tên</th>
                <th style={styles.headerText}>Email</th>
                <th style={styles.headerText}>SDT</th>
                <th style={styles.headerText}>Mã HLV</th>
                <th style={styles.headerText}>Ngày gia nhập</th>
              </tr>
            </thead>
            <tbody>
              <tr style={styles.row}>
                <td style={styles.nameCell}>
                  <i className="fas fa-user-circle" style={styles.iconAvatar}></i>
                  A
                </td>
                <td style={styles.tableText}>A@gmail.com</td>
                <td style={styles.tableText}>41234123541</td>
                <td style={styles.tableText}>1234567305477760</td>
                <td style={styles.tableText}>08/10/2024</td>
                <td style={styles.actionsCell}>
                  <i className="fas fa-edit" style={styles.iconEdit}></i>
                  <i className="fas fa-trash" style={styles.iconDelete}></i>
                </td>
              </tr>
              {/* Add more rows as needed */}
            </tbody>
          </table>
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
    fontWeight: 600,
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
  table: {
    width: '100%',
    borderCollapse: 'collapse',
  },
  tableHeader: {
    backgroundColor: '#f4f4f4',
    textAlign: 'left',
    borderBottom: '1px solid #ccc',
  },
  headerText: {
    color: '#c21f37',
    fontWeight: 600,
  },
  row: {
    borderBottom: '1px solid #ccc',
  },
  nameCell: {
    display: 'flex',
    alignItems: 'center',
    color: '#333',
  },
  iconAvatar: {
    fontSize: '40px',
    color: '#666',
    marginRight: '10px',
  },
  tableText: {
    color: '#333',
  },
  actionsCell: {
    display: 'flex',
    gap: '10px',
  },
  iconEdit: {
    color: '#c21f37',
    cursor: 'pointer',
  },
  iconDelete: {
    color: 'red',
    cursor: 'pointer',
  },
};
