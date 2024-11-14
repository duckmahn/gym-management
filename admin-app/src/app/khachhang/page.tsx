'use client';

import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/sidebar';
import Header from '../../components/header';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { NEXT_PUBLIC_API_URL } from '../../../apiconfig';

interface Customer {
  id: number;
  name: string;
  email: string;
  phone: string;
  code: string;
  joinDate: string;
}

export default function KhachHang(): JSX.Element {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [newCustomer, setNewCustomer] = useState<Customer>({
    id: 0,
    name: '',
    email: '',
    phone: '',
    code: '',
    joinDate: '',
  });
  const [showForm, setShowForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const router = useRouter();


  useEffect(() => {
    const token = localStorage.getItem('token');
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

    const fetchCustomers = async () => {
      try {
        const response = await axios.get(`${NEXT_PUBLIC_API_URL}api/Customers`);
        setCustomers(response.data);
      } catch (error) {
        console.error('Lỗi khi lấy danh sách khách hàng:', error);
      }
    };

    fetchCustomers();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewCustomer({ ...newCustomer, [name]: value });
  };

  const addCustomer = async () => {
    try {
      if (isEditing) {
        await axios.put(`${NEXT_PUBLIC_API_URL}api/Customers/${newCustomer.id}`, newCustomer);
        setCustomers(
          customers.map((customer) =>
            customer.id === newCustomer.id ? newCustomer : customer
          )
        );
      } else {
        const response = await axios.post(`${NEXT_PUBLIC_API_URL}api/Customers`, newCustomer);
        setCustomers([...customers, response.data]);
      }
      setNewCustomer({
        id: 0,
        name: '',
        email: '',
        phone: '',
        code: '',
        joinDate: '',
      });
      setShowForm(false);
      setIsEditing(false);
    } catch (error) {
      console.error('Lỗi khi thêm hoặc cập nhật khách hàng:', error);
    }
  };

  const editCustomer = (id: number) => {
    const customerToEdit = customers.find((customer) => customer.id === id);
    if (customerToEdit) {
      setNewCustomer(customerToEdit);
      setShowForm(true);
      setIsEditing(true);
    }
  };

  const deleteCustomer = async (id: number) => {
    if (confirm('Bạn có chắc muốn xóa khách hàng này?')) {
      try {
        await axios.delete(`${NEXT_PUBLIC_API_URL}api/Customers/${id}`);
        setCustomers(customers.filter((customer) => customer.id !== id));
      } catch (error) {
        console.error('Lỗi khi xóa khách hàng:', error);
      }
    }
  };

  const handlePush = (id: number) => {
    router.push(`/khachhang/${id}`);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar active="khach-hang" onToggle={setIsSidebarOpen}  />
      <main className={`flex-grow p-5 transition-all duration-300 ${
          isSidebarOpen ? 'ml-[250px]' : 'ml-0'
        }`}>
        <Header />
        <div className="p-5 bg-white rounded-lg shadow-md">
          <div className="flex justify-between items-center mb-5">
            <h2 className="text-2xl font-semibold text-gray-800">Danh sách khách hàng</h2>
            <div className="flex gap-3">
              <button
                onClick={() => {
                  setShowForm(true);
                  setIsEditing(false);
                }}
                className="px-5 py-2 bg-red-600 text-white rounded-lg"
              >
                Thêm khách hàng
              </button>
              <button
                onClick={() => handlePush(newCustomer.id)}
                className="px-5 py-2 bg-red-600 text-white rounded-lg"
              >
                Redirect
              </button>
            </div>
          </div>

          {showForm && (
            <div className="mb-5 p-4 bg-gray-100 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                {isEditing ? 'Chỉnh sửa Khách Hàng' : 'Thêm Khách Hàng Mới'}
              </h3>
              <div className="flex flex-col gap-3">
                <input
                  type="text"
                  name="name"
                  value={newCustomer.name}
                  onChange={handleInputChange}
                  placeholder="Tên"
                  className="p-2 border rounded-lg text-black"
                />
                <input
                  type="email"
                  name="email"
                  value={newCustomer.email}
                  onChange={handleInputChange}
                  placeholder="Email"
                  className="p-2 border rounded-lg text-black"
                />
                <input
                  type="text"
                  name="phone"
                  value={newCustomer.phone}
                  onChange={handleInputChange}
                  placeholder="Số điện thoại"
                  className="p-2 border rounded-lg text-black"
                />
                <input
                  type="text"
                  name="code"
                  value={newCustomer.code}
                  onChange={handleInputChange}
                  placeholder="Mã khách hàng"
                  className="p-2 border rounded-lg text-black"
                />
                <input
                  type="date"
                  name="joinDate"
                  value={newCustomer.joinDate}
                  onChange={handleInputChange}
                  placeholder="Ngày gia nhập"
                  className="p-2 border rounded-lg text-black"
                />
                <button
                  onClick={addCustomer}
                  className="mt-3 px-5 py-2 bg-green-600 text-white rounded-lg"
                >
                  {isEditing ? 'Cập nhật' : 'Lưu'}
                </button>
              </div>
            </div>
          )}

          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-100 text-left border-b">
                <th className="text-red-600 font-semibold">Tên</th>
                <th className="text-red-600 font-semibold">Email</th>
                <th className="text-red-600 font-semibold">SDT</th>
                <th className="text-red-600 font-semibold">Mã khách hàng</th>
                <th className="text-red-600 font-semibold">Ngày gia nhập</th>
              </tr>
            </thead>
            <tbody>
              {customers.map((customer) => (
                <tr key={customer.id} className="border-b">
                  <td className="flex items-center text-gray-800">
                    <i className="fas fa-user-circle text-gray-500 text-3xl mr-2"></i>
                    {customer.name}
                  </td>
                  <td className="text-gray-800">{customer.email}</td>
                  <td className="text-gray-800">{customer.phone}</td>
                  <td className="text-gray-800">{customer.code}</td>
                  <td className="text-gray-800">{customer.joinDate}</td>
                  <td className="flex gap-2">
                    <i
                      className="fas fa-edit text-red-600 cursor-pointer"
                      onClick={() => editCustomer(customer.id)}
                    ></i>
                    <i
                      className="fas fa-trash text-red-600 cursor-pointer"
                      onClick={() => deleteCustomer(customer.id)}
                    ></i>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
