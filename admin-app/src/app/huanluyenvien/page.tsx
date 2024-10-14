'use client';

import React from 'react';
import Sidebar from '../../components/sidebar';
import Header from '../../components/header';

export default function HuanLuyenVien(): JSX.Element {
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar active="huan-luyen-vien" />
      <main className="flex-grow p-5">
        <Header />
        <div className="p-5 bg-white rounded-lg shadow-md">
          <div className="flex justify-between items-center mb-5">
            <h2 className="text-2xl font-semibold text-gray-800">Danh sách HLV</h2>
            <button className="px-5 py-2 bg-red-600 text-white rounded-lg">
              Thêm huấn luyện viên
            </button>
          </div>
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-100 text-left border-b">
                <th className="text-red-600 font-semibold">Tên</th>
                <th className="text-red-600 font-semibold">Email</th>
                <th className="text-red-600 font-semibold">SDT</th>
                <th className="text-red-600 font-semibold">Mã HLV</th>
                <th className="text-red-600 font-semibold">Ngày gia nhập</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="flex items-center text-gray-800">
                  <i className="fas fa-user-circle text-gray-500 text-3xl mr-2"></i>
                  A
                </td>
                <td className="text-gray-800">A@gmail.com</td>
                <td className="text-gray-800">41234123541</td>
                <td className="text-gray-800">1234567305477760</td>
                <td className="text-gray-800">08/10/2024</td>
                <td className="flex gap-2">
                  <i className="fas fa-edit text-red-600 cursor-pointer"></i>
                  <i className="fas fa-trash text-red-600 cursor-pointer"></i>
                </td>
              </tr>
              
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
