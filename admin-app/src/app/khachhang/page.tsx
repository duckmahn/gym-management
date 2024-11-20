'use client';

import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/sidebar';
import Header from '../../components/header';
import axios from 'axios';

import { NEXT_PUBLIC_API_URL } from '../../../apiconfig';
import { useRouter } from 'next/navigation';

interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  code: string;
  joinDate: string;
}

export default function KhachHang(): JSX.Element {
  const [users, setUsers] = useState<User[]>([]);
  const [newUser, setNewUser] = useState<User>({
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

  const router = useRouter()
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login'); // Redirect to login
      return;
    }
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

    const fetchUsers = async () => {
      try {
        const response = await axios.get(`${NEXT_PUBLIC_API_URL}api/Users`);
        setUsers(response.data);
      } catch (error) {
        console.error('Lỗi khi lấy danh sách người dùng:', error);
      }
    };

    fetchUsers();
  }, [router]);

  const handleSidebarToggle = (isOpen: boolean) => {
    setIsSidebarOpen(isOpen);
    console.log('Sidebar is now', isOpen ? 'open' : 'closed');
  };
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewUser({ ...newUser, [name]: value });
  };

  const addUser = async () => {
    try {
      if (isEditing) {
        await axios.put(`${NEXT_PUBLIC_API_URL}api/Users/${newUser.id}`, newUser);
        setUsers(
          users.map((user) =>
            user.id === newUser.id ? newUser : user
          )
        );
      } else {
        const response = await axios.post(`${NEXT_PUBLIC_API_URL}api/Users`, newUser);
        setUsers([...users, response.data]);
      }
      setNewUser({
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
      console.error('Lỗi khi thêm hoặc cập nhật người dùng:', error);
    }
  };

  const editUser = (id: number) => {
    const userToEdit = users.find((user) => user.id === id);
    if (userToEdit) {
      setNewUser(userToEdit);
      setShowForm(true);
      setIsEditing(true);
    }
  };

  const deleteUser = async (id: number) => {
    if (confirm('Bạn có chắc muốn xóa người dùng này?')) {
      try {
        await axios.delete(`${NEXT_PUBLIC_API_URL}api/Users/${id}`);
        setUsers(users.filter((user) => user.id !== id));
      } catch (error) {
        console.error('Lỗi khi xóa người dùng:', error);
      }
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar active="khach-hang" onToggle={handleSidebarToggle} />
      <main className={`flex-grow p-5 transition-all duration-300 ${
          isSidebarOpen ? 'ml-[250px]' : 'ml-0'
        }`}>
        <Header />
        <div className="p-5 bg-white rounded-lg shadow-md">
          <div className="flex justify-between items-center mb-5">
            <h2 className="text-2xl font-semibold text-gray-800">Danh sách người dùng</h2>
            <div className="flex gap-3">
              <button
                onClick={() => {
                  setShowForm(true);
                  setIsEditing(false);
                }}
                className="px-5 py-2 bg-red-600 text-white rounded-lg"
              >
                Thêm người dùng
              </button>
            </div>
          </div>

          {showForm && (
            <div className="mb-5 p-4 bg-gray-100 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                {isEditing ? 'Chỉnh sửa Người Dùng' : 'Thêm Người Dùng Mới'}
              </h3>
              <div className="flex flex-col gap-3">
                <input
                  type="text"
                  name="name"
                  value={newUser.name}
                  onChange={handleInputChange}
                  placeholder="Tên"
                  className="p-2 border rounded-lg text-black"
                />
                <input
                  type="email"
                  name="email"
                  value={newUser.email}
                  onChange={handleInputChange}
                  placeholder="Email"
                  className="p-2 border rounded-lg text-black"
                />
                <input
                  type="text"
                  name="phone"
                  value={newUser.phone}
                  onChange={handleInputChange}
                  placeholder="Số điện thoại"
                  className="p-2 border rounded-lg text-black"
                />
                <input
                  type="text"
                  name="code"
                  value={newUser.code}
                  onChange={handleInputChange}
                  placeholder="Mã người dùng"
                  className="p-2 border rounded-lg text-black"
                />
                <input
                  type="date"
                  name="joinDate"
                  value={newUser.joinDate}
                  onChange={handleInputChange}
                  placeholder="Ngày gia nhập"
                  className="p-2 border rounded-lg text-black"
                />
                <button
                  onClick={addUser}
                  className="mt-3 px-5 py-2 bg-green-600 text-white rounded-lg"
                >
                  {isEditing ? 'Cập nhật' : 'Lưu'}
                </button>
                <button
                  onClick={() => setShowForm(false)}
                  className="mt-3 px-5 py-2 bg-gray-500 text-white rounded-lg"
                >
                  Hủy
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
                <th className="text-red-600 font-semibold">Mã người dùng</th>
                <th className="text-red-600 font-semibold">Ngày gia nhập</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} className="border-b">
                  <td className="flex items-center text-gray-800">
                    <i className="fas fa-user-circle text-gray-500 text-3xl mr-2"></i>
                    {user.name}
                  </td>
                  <td className="text-gray-800">{user.email}</td>
                  <td className="text-gray-800">{user.phone}</td>
                  <td className="text-gray-800">{user.code}</td>
                  <td className="text-gray-800">{user.joinDate}</td>
                  <td className="flex gap-2">
                    <i
                      className="fas fa-edit text-red-600 cursor-pointer"
                      onClick={() => editUser(user.id)}
                    ></i>
                    <i
                      className="fas fa-trash text-red-600 cursor-pointer"
                      onClick={() => deleteUser(user.id)}
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
