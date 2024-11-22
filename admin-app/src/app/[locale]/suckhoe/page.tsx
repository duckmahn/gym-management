"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { NEXT_PUBLIC_API_URL } from "../../../../apiconfig";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import Sidebar from "../components/sidebar";
import Header from "../components/header";

interface Healinfo {
  id: string;
  height: number;
  weight: number;
  age: number;
  bmi: number;
  caloriesAvg: number;
  dailyCalories: number;
  lastHealthCheckDate: string;
  notes: string;
  usersId: string;
  gender: string;
  activityLevel: string;
}

export default function Healinfo(): JSX.Element {
  const [healinfo, setHealinfo] = useState<Healinfo | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const router = useRouter();

  const handleSidebarToggle = (isOpen: boolean) => {
    setIsSidebarOpen(isOpen);
    console.log("Sidebar is now", isOpen ? "open" : "closed");
  };

  useEffect(() => {
    const token = Cookies.get("token");
    if (!token) {
      router.push("");
    }

    const fetchHealinfo = async () => {
      try {
        const response = await axios.get(
          `${NEXT_PUBLIC_API_URL}/api/Healinfo`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(response.data);
        setHealinfo(response.data);
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu sức khỏe:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchHealinfo();
  }, [router]);

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar active="suc-khoe" onToggle={handleSidebarToggle} />
      <main
        className={`flex-grow p-5 transition-all duration-300 ${
          isSidebarOpen ? "ml-[250px]" : "ml-0"
        }`}
      >
        <div className="flex-1 flex flex-col">
          <Header />

          <div className="flex-grow p-5 bg-gray-100">
            <h1 className="text-3xl font-semibold text-gray-800 mb-5">
              Thông tin sức khỏe
            </h1>
            {isLoading ? (
              <p>Đang tải dữ liệu...</p>
            ) : healinfo ? (
              <div className="bg-white p-5 rounded-lg shadow-md">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                  Thông tin chi tiết
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-lg">
                  <div className="space-y-6">
                    <p>
                      <strong>Chiều cao:</strong> {healinfo.height} cm
                    </p>
                    <p>
                      <strong>Cân nặng:</strong> {healinfo.weight} kg
                    </p>
                    <p>
                      <strong>Tuổi:</strong> {healinfo.age} tuổi
                    </p>
                    <p>
                      <strong>BMI:</strong> {healinfo.bmi}
                    </p>
                  </div>
                  <div className="space-y-6">
                    <p>
                      <strong>Lượng calo trung bình:</strong>{" "}
                      {healinfo.caloriesAvg} calo
                    </p>
                    <p>
                      <strong>Lượng calo tiêu thụ hôm nay:</strong>{" "}
                      {healinfo.dailyCalories} calo
                    </p>
                    <p>
                      <strong>Ngày kiểm tra sức khỏe cuối:</strong>{" "}
                      {new Date(
                        healinfo.lastHealthCheckDate
                      ).toLocaleDateString()}
                    </p>
                    <p>
                      <strong>Ghi chú:</strong> {healinfo.notes}
                    </p>
                    <p>
                      <strong>Giới tính:</strong> {healinfo.gender}
                    </p>
                    <p>
                      <strong>Mức độ hoạt động:</strong>{" "}
                      {healinfo.activityLevel}
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <p>Không có dữ liệu sức khỏe để hiển thị.</p>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
