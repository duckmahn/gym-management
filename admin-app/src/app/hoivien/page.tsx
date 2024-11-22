'use client';

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { NEXT_PUBLIC_API_URL } from '../../../apiconfig';
import Sidebar from '../../components/sidebar';
import Header from '../../components/header';
import { useRouter } from 'next/navigation';
import Cookies from "js-cookie";

interface User {
    id: number;
    name: string;
    email: string;
    membershipType: 'VIP' | 'Pro' | 'Normal';
}

export default function Members(): JSX.Element {
    const [users, setUsers] = useState<User[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [isAddingUser, setIsAddingUser] = useState(false); // State to toggle form
    const [newUser, setNewUser] = useState({ name: '', email: '', membershipType: 'Normal' });
    const [editingUser, setEditingUser] = useState<User | null>(null);
    const router = useRouter();

    useEffect(() => {
        const token = Cookies.get('token');
        if (!token) {
            router.push('/login');
            return;
        }

        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

        fetchUsers();
    }, [router]);

    const fetchUsers = async () => {
        setIsLoading(true);
        try {
            const response = await axios.get(`${NEXT_PUBLIC_API_URL}api/Membership`);
            setUsers(response.data.user);
        } catch (error) {
            console.error('Lỗi khi lấy dữ liệu hội viên:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSidebarToggle = (isOpen: boolean) => {
        setIsSidebarOpen(isOpen);
    };

    // Thêm hội viên mới
    const handleAddUser = async () => {
        try {
            const response = await axios.post(`${NEXT_PUBLIC_API_URL}api/Membership`, newUser);
            setUsers((prevUsers) => [...prevUsers, response.data]);
            setNewUser({ name: '', email: '', membershipType: 'Normal' }); // Reset form
            setIsAddingUser(false); // Close form
        } catch (error) {
            console.error('Lỗi khi thêm hội viên:', error);
        }
    };

    // Sửa hội viên
    const handleEditUser = async () => {
        if (!editingUser) return;
        try {
            const response = await axios.put(
                `${NEXT_PUBLIC_API_URL}api/Membership/${editingUser.id}`,
                editingUser
            );
            setUsers((prevUsers) =>
                prevUsers.map((user) => (user.id === editingUser.id ? response.data : user))
            );
            setEditingUser(null); // Reset editing
        } catch (error) {
            console.error('Lỗi khi sửa hội viên:', error);
        }
    };

    // Xóa hội viên
    const handleDeleteUser = async (id: number) => {
        try {
            await axios.delete(`${NEXT_PUBLIC_API_URL}api/Membership/${id}`);
            setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
        } catch (error) {
            console.error('Lỗi khi xóa hội viên:', error);
        }
    };

    return (
        <div className="flex h-screen bg-gray-100">
            <Sidebar active="members" onToggle={handleSidebarToggle} />
            <main
                className={`flex-grow p-5 transition-all duration-300 ${isSidebarOpen ? 'ml-[250px]' : 'ml-0'}`}
            >
                <Header />
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-semibold text-gray-800">Danh Sách Hội Viên</h2>
                    <button
                        className="bg-red-600 text-white px-4 py-2 rounded"
                        onClick={() => setIsAddingUser(!isAddingUser)}
                    >
                        Thêm Hội Viên
                    </button>
                </div>

                {isAddingUser && (
                    <div className="mb-6 bg-white p-5 rounded-lg shadow-md">
                        <h3 className="text-xl font-semibold text-gray-800 mb-4">Thêm Hội Viên</h3>
                        <input
                            type="text"
                            placeholder="Tên"
                            className="block w-full p-2 mb-4 border rounded text-gray-800"
                            value={newUser.name}
                            onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                        />
                        <input
                            type="email"
                            placeholder="Email"
                            className="block w-full p-2 mb-4 border rounded text-gray-800"
                            value={newUser.email}
                            onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                        />
                        <select
                            className="block w-full p-2 mb-4 border rounded text-gray-800"
                            value={newUser.membershipType}
                            onChange={(e) =>
                                setNewUser({ ...newUser, membershipType: e.target.value as User['membershipType'] })
                            }
                        >
                            <option value="Normal">Normal</option>
                            <option value="Pro">Pro</option>
                            <option value="VIP">VIP</option>
                        </select>
                        <button
                            className="bg-green-500 text-white px-4 py-2 rounded"
                            onClick={handleAddUser}
                        >
                            Thêm
                        </button>
                        <button
                            className="bg-gray-500 text-white px-4 py-2 rounded ml-4"
                            onClick={() => setIsAddingUser(false)} 
                        >
                            Hủy
                        </button>
                    </div>
                )}

                {isLoading ? (
                    <p>Đang tải dữ liệu...</p>
                ) : (
                    <table className="w-full border-collapse">
                        <thead>
                            <tr className="bg-gray-100 text-left border-b">
                                <th className="text-red-600 font-semibold min-w-[150px]">Tên</th>
                                <th className="text-red-600 font-semibold min-w-[200px]">Email</th>
                                <th className="text-red-600 font-semibold min-w-[100px]">Hạng</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user) => (
                                <tr key={user.id} className="border-b">
                                    <td className="text-gray-800">{user.name}</td>
                                    <td className="text-gray-800">{user.email}</td>
                                    <td className="text-gray-800">{user.membershipType}</td>
                                    <td className="flex gap-4 justify-center">
                                        <i
                                            className="fas fa-edit text-red-600 cursor-pointer"
                                            onClick={() => setEditingUser(user)}
                                        ></i>
                                        <i
                                            className="fas fa-trash text-red-600 cursor-pointer"
                                            onClick={() => handleDeleteUser(user.id)}
                                        ></i>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}

                {editingUser && (
                    <div className="bg-white p-5 rounded-lg shadow-md mb-6">
                        <h3 className="text-xl font-semibold text-gray-800 mb-4">Sửa Hội Viên</h3>
                        <input
                            type="text"
                            className="block w-full p-2 mb-4 border rounded"
                            value={editingUser.name}
                            onChange={(e) =>
                                setEditingUser({ ...editingUser, name: e.target.value })
                            }
                        />
                        <input
                            type="email"
                            className="block w-full p-2 mb-4 border rounded"
                            value={editingUser.email}
                            onChange={(e) =>
                                setEditingUser({ ...editingUser, email: e.target.value })
                            }
                        />
                        <select
                            className="block w-full p-2 mb-4 border rounded"
                            value={editingUser.membershipType}
                            onChange={(e) =>
                                setEditingUser({
                                    ...editingUser,
                                    membershipType: e.target.value as User['membershipType'],
                                })
                            }
                        >
                            <option value="Normal">Normal</option>
                            <option value="Pro">Pro</option>
                            <option value="VIP">VIP</option>
                        </select>
                        <button
                            className="bg-green-500 text-white px-4 py-2 rounded"
                            onClick={handleEditUser}
                        >
                            Cập Nhật
                        </button>
                    </div>
                )}
            </main>
        </div>
    );
}
