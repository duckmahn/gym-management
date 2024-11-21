"use client";

import React from "react";
import Sidebar from "../../components/sidebar";
import Header from "../../components/header";
import { useTheme } from "next-themes";

export default function KhachHang(): JSX.Element {
  const { theme } = useTheme();

  return (
    <div
      className={`flex h-screen ${
        theme === "dark" ? "bg-gray-900 text-white" : "bg-gray-100"
      }`}
    >
      <Sidebar active="khach-hang" />
      <main className="flex-grow p-5">
        <Header />
        <div
          className={`p-5 rounded-lg shadow-md ${
            theme === "dark" ? "bg-gray-800" : "bg-white"
          }`}
        >
          <div className="flex justify-between items-center mb-5">
            <h2 className="text-2xl font-semibold text-gray-800">
              Danh sách khách hàng
            </h2>
            <button
              className={`px-5 py-2 rounded-lg ${
                theme === "dark" ? "bg-red-500" : "bg-red-600 text-white"
              }`}
            >
              Thêm khách hàng
            </button>
          </div>
          <table
            className={`w-full border-collapse ${
              theme === "dark" ? "bg-gray-800" : "bg-white"
            }`}
          >
            <thead>
              <tr
                className={`text-left border-b ${
                  theme === "dark" ? "bg-gray-700" : "bg-gray-100"
                }`}
              >
                <th className="text-red-600 font-semibold">Tên</th>
                <th className="text-red-600 font-semibold">Email</th>
                <th className="text-red-600 font-semibold">SDT</th>
                <th className="text-red-600 font-semibold">Mã khách hàng</th>
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
