"use client";

import Sidebar from "../../components/sidebar";
import Header from "../../components/header";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { NEXT_PUBLIC_API_URL } from "../../../apiconfig";
import Cookies from "js-cookie";
import Image from 'next/image';

interface Trainer {
  id: string;
  name: string;
  email: string;
  phone: string;
  specialty: string;
  experience: string;
  avatar: string;
  type: string;
}

export default function HuanLuyenVien(): JSX.Element {
  const [trainers, setTrainers] = useState<Trainer[]>([]);
  const [newTrainer, setNewTrainer] = useState<Trainer>({
    id: "",
    name: "",
    email: "",
    phone: "",
    specialty: "",
    experience: "",
    avatar: "",
    type: "",
  });
  const [showForm, setShowForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const token = Cookies.get("token");
    if (!token) {
      router.push('/login');
      return;
    }
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    const fetchTrainers = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`${NEXT_PUBLIC_API_URL}api/Trainers`);
        setTrainers(response.data);
      } catch (error) {
        console.error("Lỗi khi lấy danh sách huấn luyện viên:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchTrainers();
  }, [router]);

  const handleSidebarToggle = (isOpen: boolean) => {
    setIsSidebarOpen(isOpen);
    console.log('Sidebar is now', isOpen ? 'open' : 'closed');
  };

  // Xử lý thay đổi dữ liệu form
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewTrainer({ ...newTrainer, [name]: value });
  };

  // Hàm thêm hoặc cập nhật huấn luyện viên
  const addTrainer = async () => {
    try {
      if (isEditing) {
        await axios.put(
          `${NEXT_PUBLIC_API_URL}api/Trainers/${newTrainer.id}`,
          newTrainer
        );
        setTrainers(
          trainers.map((trainer) =>
            trainer.id === newTrainer.id ? newTrainer : trainer
          )
        );
      } else {
        const response = await axios.post(
          `${NEXT_PUBLIC_API_URL}api/Trainers`,
          newTrainer
        );
        setTrainers([...trainers, response.data]);
      }
      setNewTrainer({
        id: "",
        name: "",
        email: "",
        phone: "",
        specialty: "",
        experience: "",
        avatar: "",
        type: "",
      });
      setShowForm(false);
      setIsEditing(false);
    } catch (error) {
      console.error("Lỗi khi thêm hoặc cập nhật huấn luyện viên:", error);
    }
  };

  // Hàm chỉnh sửa huấn luyện viên
  const editTrainer = (id: string) => {
    const trainerToEdit = trainers.find((trainer) => trainer.id === id);
    if (trainerToEdit) {
      setNewTrainer(trainerToEdit);
      setShowForm(true);
      setIsEditing(true);
    }
  };

  // Hàm xóa huấn luyện viên
  const deleteTrainer = async (id: string) => {
    if (confirm("Bạn có chắc muốn xóa huấn luyện viên này?")) {
      try {
        await axios.delete(`${NEXT_PUBLIC_API_URL}api/Trainers/${id}`);
        setTrainers(trainers.filter(trainer => trainer.id !== id));
      } catch (error) {
        console.error("Lỗi khi xóa huấn luyện viên:", error);
      }
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar active="huanluyenvien" onToggle={handleSidebarToggle} />
      <main
        className={`flex-grow p-5 transition-all duration-300 ${isSidebarOpen ? 'ml-[250px]' : 'ml-0'
          }`}
      >
        <Header />
        <div className="p-5 bg-white rounded-lg shadow-md">
          <div className="flex justify-between items-center mb-5">
            <h2 className="text-2xl font-semibold text-gray-800">
              Danh sách HLV
            </h2>
            <button
              onClick={() => {
                setShowForm(true);
                setIsEditing(false);
              }}
              className="px-5 py-2 bg-red-600 text-white rounded-lg"
            >
              Thêm huấn luyện viên
            </button>
          </div>
          {isLoading ? (
            <div className="text-center">
              <p className="text-lg text-gray-600">Đang tải dữ liệu...</p>
            </div>
          ) : (
            <>
              {showForm && (
                <div className="mb-5 p-4 bg-gray-100 rounded-lg">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    {isEditing
                      ? "Chỉnh sửa Huấn Luyện Viên"
                      : "Thêm Huấn Luyện Viên Mới"}
                  </h3>
                  <div className="flex flex-col gap-3">
                    <input
                      type="text"
                      name="name"
                      value={newTrainer.name}
                      onChange={handleInputChange}
                      placeholder="Tên"
                      className="p-2 border rounded-lg text-black"
                    />
                    <input
                      type="email"
                      name="email"
                      value={newTrainer.email}
                      onChange={handleInputChange}
                      placeholder="Email"
                      className="p-2 border rounded-lg text-black"
                    />
                    <input
                      type="text"
                      name="phone"
                      value={newTrainer.phone}
                      onChange={handleInputChange}
                      placeholder="Số điện thoại"
                      className="p-2 border rounded-lg text-black"
                    />
                    <input
                      type="text"
                      name="specialty"
                      value={newTrainer.specialty}
                      onChange={handleInputChange}
                      placeholder="Chuyên môn"
                      className="p-2 border rounded-lg text-black"
                    />
                    <input
                      type="text"
                      name="experience"
                      value={newTrainer.experience}
                      onChange={handleInputChange}
                      placeholder="Kinh nghiệm"
                      className="p-2 border rounded-lg text-black"
                    />
                    <input
                      type="text"
                      name="avatar"
                      value={newTrainer.avatar}
                      onChange={handleInputChange}
                      placeholder="Avatar"
                      className="p-2 border rounded-lg text-black"
                    />
                    <input
                      type="text"
                      name="type"
                      value={newTrainer.type}
                      onChange={handleInputChange}
                      placeholder="Loại huấn luyện viên"
                      className="p-2 border rounded-lg text-black"
                    />
                    <button
                      onClick={addTrainer}
                      className="mt-3 px-5 py-2 bg-green-600 text-white rounded-lg"
                    >
                      {isEditing ? "Cập nhật" : "Lưu"}
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
                  <th className="text-red-600 font-semibold">Avatar</th>
                    <th className="text-red-600 font-semibold">Tên</th>
                    <th className="text-red-600 font-semibold">Email</th>
                    <th className="text-red-600 font-semibold">SĐT</th>
                    <th className="text-red-600 font-semibold">Chuyên môn</th>
                    <th className="text-red-600 font-semibold">Kinh nghiệm</th>
                    <th className="text-red-600 font-semibold">Loại</th>
                  </tr>
                </thead>
                <tbody>
                  {trainers.map((trainer) => (
                    <tr key={trainer.id} className="border-b">
                      <td className="text-gray-800">
                        {trainer.avatar ? (
                          <Image
                            src="/"
                            alt="avt"
                            className="w-10 h-10 rounded-full object-cover"
                            width={40}
                            height={40}
                          />
                        ) : (
                          <i className="fas fa-user-circle text-gray-500 text-3xl"></i>
                        )}
                      </td>
                      <td>{trainer.name}</td>
                      <td>{trainer.email}</td>
                      <td>{trainer.phone}</td>
                      <td>{trainer.specialty}</td>
                      <td>{trainer.experience}</td>
                      <td>{trainer.type}</td>
                      <td className="flex gap-2">
                        <i
                          className="fas fa-edit text-red-600 cursor-pointer"
                          onClick={() => editTrainer(trainer.id)}
                        ></i>
                        <i
                          className="fas fa-trash text-red-600 cursor-pointer"
                          onClick={() => deleteTrainer(trainer.id)}
                        ></i>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </>
          )}
        </div>
      </main>
    </div>
  );
}
