"use client";

import Sidebar from "../../components/sidebar";
import Header from "../../components/header";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { NEXT_PUBLIC_API_URL } from "../../../apiconfig";

interface Trainer {
  id: number;
  name: string;
  email: string;
  phone: string;
  code: string;
  joinDate: string;
}

export default function HuanLuyenVien(): JSX.Element {
  const [trainers, setTrainers] = useState<Trainer[]>([]);
  const [newTrainer, setNewTrainer] = useState<Trainer>({
    id: 0,
    name: "",
    email: "",
    phone: "",
    code: "",
    joinDate: "",
  });
  const [showForm, setShowForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const router = useRouter();

  // Kiểm tra và thiết lập token
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/dashboard");
      return;
    }
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    // Lấy danh sách huấn luyện viên từ API
    const fetchTrainers = async () => {
      try {
        const response = await axios.get(`${NEXT_PUBLIC_API_URL}api/Trainers`);
        setTrainers(response.data);
      } catch (error) {
        console.error("Lỗi khi lấy danh sách huấn luyện viên:", error);
      }
    };
    fetchTrainers();
  }, [router]);

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
        id: 0,
        name: "",
        email: "",
        phone: "",
        code: "",
        joinDate: "",
      });
      setShowForm(false);
      setIsEditing(false);
    } catch (error) {
      console.error("Lỗi khi thêm hoặc cập nhật huấn luyện viên:", error);
    }
  };

  // Hàm chỉnh sửa huấn luyện viên
  const editTrainer = (id: number) => {
    const trainerToEdit = trainers.find((trainer) => trainer.id === id);
    if (trainerToEdit) {
      setNewTrainer(trainerToEdit);
      setShowForm(true);
      setIsEditing(true);
    }
  };

  // Hàm xóa huấn luyện viên
  const deleteTrainer = async (id: number) => {
    if (confirm("Bạn có chắc muốn xóa huấn luyện viên này?")) {
      try {
        await axios.delete(`${NEXT_PUBLIC_API_URL}api/Trainers/${id}`);
        setTrainers(trainers.filter((trainer) => trainer.id !== id));
      } catch (error) {
        console.error("Lỗi khi xóa huấn luyện viên:", error);
      }
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar active="huanluyenvien" onToggle={setIsSidebarOpen} />
      <main
        className={`flex-grow p-5 transition-all duration-300 ${
          isSidebarOpen ? "ml-[250px]" : "ml-0"
        }`}
      >
        <Header />
        <div
          className={`p-5 rounded-lg shadow-md ${
            theme === "dark" ? "bg-gray-800" : "bg-white"
          }`}
        >
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
            <button onClick={handlePush}>redirect</button>
          </div>

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
                  name="code"
                  value={newTrainer.code}
                  onChange={handleInputChange}
                  placeholder="Mã HLV"
                  className="p-2 border rounded-lg text-black"
                />
                <input
                  type="date"
                  name="joinDate"
                  value={newTrainer.joinDate}
                  onChange={handleInputChange}
                  className="p-2 border rounded-lg text-black"
                />
                <button
                  onClick={addTrainer}
                  className="mt-3 px-5 py-2 bg-green-600 text-white rounded-lg"
                >
                  {isEditing ? "Cập nhật" : "Lưu"}
                </button>
              </div>
            </div>
          )}

          <table className="w-full border-collapse">
            <thead>
              <tr
                className={`text-left border-b ${
                  theme === "dark" ? "bg-gray-700" : "bg-gray-100"
                }`}
              >
                <th className="text-red-600 font-semibold">Tên</th>
                <th className="text-red-600 font-semibold">Email</th>
                <th className="text-red-600 font-semibold">SDT</th>
                <th className="text-red-600 font-semibold">Mã HLV</th>
                <th className="text-red-600 font-semibold">Ngày gia nhập</th>
                <th className="text-red-600 font-semibold">Hành động</th>
              </tr>
            </thead>
            <tbody>
              {trainers.map((trainer) => (
                <tr key={trainer.id} className="border-b">
                  <td className="text-gray-800">{trainer.name}</td>
                  <td className="text-gray-800">{trainer.email}</td>
                  <td className="text-gray-800">{trainer.phone}</td>
                  <td className="text-gray-800">{trainer.code}</td>
                  <td className="text-gray-800">{trainer.joinDate}</td>
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
        </div>
      </main>
    </div>
  );
}
