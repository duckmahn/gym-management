'use client';

import React from 'react';
import Sidebar from '../../components/sidebar';
import Header from '../../components/header';

export default function CSVCVaThietBi(): JSX.Element {
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar active="csvc-va-thiet-bi" />
      <main className="flex-grow p-5">
        <Header />
        <div className="p-5 bg-white rounded-lg shadow-md">
          <div className="flex justify-between items-center mb-5">
            <h2 className="text-2xl font-semibold text-gray-800">Danh sách thiết bị và CSVC</h2>
            <button className="px-5 py-2 bg-red-600 text-white rounded-lg">
              Thêm CSVC và thiết bị
            </button>
          </div>
          <div className="flex gap-5">
            <div className="bg-white p-5 rounded-lg shadow-md text-left min-w-[250px]">
              <h3 className="text-lg font-semibold text-gray-600 mb-2">Máy Chạy 1</h3>
              <hr className="border-t border-gray-300 my-2" />
              <div className="mb-5">
                <p className="text-base text-black mb-1">Thiết Bị Tập</p>
                <p className="text-sm text-gray-500 mb-1">Loại</p>
                <p className="text-base text-black">
                  <strong>$25000</strong>
                </p>
                <p className="text-sm text-gray-500">Giá</p>
              </div>
              <div className="flex justify-between items-center">
                <button className="px-3 py-1 bg-red-600 text-white rounded-lg">
                  Chi Tiết <span className="ml-1 text-base">→</span>
                </button>
                <div className="flex items-center">
                  <i className="fas fa-edit text-red-600 cursor-pointer mr-2"></i>
                  <i className="fas fa-trash text-red-600 cursor-pointer"></i>
                </div>
              </div>
            </div>
            
          </div>
        </div>
      </main>
    </div>
  );
}
