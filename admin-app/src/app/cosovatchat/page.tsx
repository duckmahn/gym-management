"use client";

import React, { useState, useEffect } from "react";
import Sidebar from "../../components/sidebar";
import Header from "../../components/header";
import { useTheme } from "next-themes";

interface Equipment {
  id: number;
  name: string;
  type: string;
  price: number;
}

export default function CSVCVaThietBi(): JSX.Element {
  const [equipments, setEquipments] = useState<Equipment[]>([]);
  const [newEquipment, setNewEquipment] = useState<Equipment>({ id: 0, name: "", type: "", price: 0 });
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);

  const { theme } = useTheme();

  useEffect(() => {
    fetchEquipments();
  }, []);

  const fetchEquipments = async () => {
    try {
      const response = await fetch("https://api.nosteable.works/api/facilities");
      const data = await response.json();
      setEquipments(data);
    } catch (error) {
      console.error("Lỗi khi tải dữ liệu thiết bị:", error);
    }
  };

  const addEquipmentAPI = async () => {
    try {
      await fetch("https://api.nosteable.works/api/facilities", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newEquipment),
      });
      fetchEquipments();
      setNewEquipment({ id: 0, name: "", type: "", price: 0 });
      setIsAdding(false);
    } catch (error) {
      console.error("Lỗi khi thêm thiết bị:", error);
    }
  };

  const updateEquipmentAPI = async () => {
    try {
      await fetch(`https://api.nosteable.works/api/facilities/${editingId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newEquipment),
      });
      fetchEquipments();
      setNewEquipment({ id: 0, name: "", type: "", price: 0 });
      setIsAdding(false);
      setIsEditing(false);
      setEditingId(null);
    } catch (error) {
      console.error("Lỗi khi cập nhật thiết bị:", error);
    }
  };

  const deleteEquipmentAPI = async (id: number) => {
    try {
      await fetch(`https://api.nosteable.works/api/facilities/${id}`, {
        method: "DELETE",
      });
      fetchEquipments();
    } catch (error) {
      console.error("Lỗi khi xóa thiết bị:", error);
    }
  };

  const handleSaveEquipment = () => {
    if (isEditing) {
      updateEquipmentAPI();
    } else {
      addEquipmentAPI();
    }
  };

  const editEquipment = (id: number) => {
    const equipmentToEdit = equipments.find((equipment) => equipment.id === id);
    if (equipmentToEdit) {
      setNewEquipment(equipmentToEdit);
      setIsEditing(true);
      setEditingId(id);
      setIsAdding(true);
    }
  };

  const deleteEquipment = (id: number) => {
    if (confirm("Bạn có chắc muốn xóa thiết bị này?")) {
      deleteEquipmentAPI(id);
    }
  };

  return (
    <div
      className={`flex h-screen ${
        theme === "dark" ? "bg-gray-900 text-white" : "bg-gray-100 text-black"
      }`}
    >
      <Sidebar active="csvc-va-thiet-bi" />
      <main className="flex-grow p-5">
        <Header />
        <div
          className={`p-5 rounded-lg shadow-md ${
            theme === "dark" ? "bg-gray-800" : "bg-white"
          }`}
        >
          <div className="flex justify-between items-center mb-5">
            <h2 className="text-2xl font-semibold">Danh sách thiết bị và CSVC</h2>
            <button
              onClick={() => {
                setIsAdding(true);
                setIsEditing(false);
                setNewEquipment({ id: 0, name: "", type: "", price: 0 });
              }}
              className={`px-5 py-2 rounded-lg ${
                theme === "dark" ? "bg-red-500" : "bg-red-600 text-white"
              }`}
            >
              Thêm CSVC và thiết bị
            </button>
          </div>

          {isAdding && (
            <div className="mb-5 p-5 rounded-lg bg-gray-100 dark:bg-gray-700">
              <h3 className="text-lg font-semibold mb-2">
                {isEditing ? "Chỉnh sửa Thiết Bị" : "Thêm Thiết Bị Mới"}
              </h3>
              <input
                type="text"
                placeholder="Tên"
                value={newEquipment.name}
                onChange={(e) => setNewEquipment({ ...newEquipment, name: e.target.value })}
                className="border rounded w-full px-3 py-2 mb-2 text-black"
              />
              <input
                type="text"
                placeholder="Loại"
                value={newEquipment.type}
                onChange={(e) => setNewEquipment({ ...newEquipment, type: e.target.value })}
                className="border rounded w-full px-3 py-2 mb-2 text-black"
              />
              <input
                type="number"
                placeholder="Giá"
                value={newEquipment.price}
                onChange={(e) => setNewEquipment({ ...newEquipment, price: Number(e.target.value) })}
                className="border rounded w-full px-3 py-2 mb-2 text-black"
              />
              <button
                onClick={handleSaveEquipment}
                className="px-5 py-2 bg-green-600 text-white rounded-lg"
              >
                {isEditing ? "Cập nhật" : "Thêm"}
              </button>
              <button
                onClick={() => setIsAdding(false)}
                className="px-5 py-2 bg-gray-400 text-white rounded-lg ml-2"
              >
                Hủy
              </button>
            </div>
          )}

          <div className="flex gap-5 flex-wrap">
            {equipments.map((equipment) => (
              <div
                key={equipment.id}
                className={`p-5 rounded-lg shadow-md ${
                  theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-black"
                } min-w-[250px]`}
              >
                <h3 className="text-lg font-semibold mb-2">{equipment.name}</h3>
                <p className="text-base mb-1">{equipment.type}</p>
                <p className="text-base">Giá: {equipment.price}₫</p>
                <div className="flex justify-between items-center mt-3">
                  <button className="px-3 py-1 bg-red-600 text-white rounded-lg">Chi Tiết</button>
                  <div className="flex items-center">
                    <i
                      className="fas fa-edit text-red-600 cursor-pointer mr-2"
                      onClick={() => editEquipment(equipment.id)}
                    ></i>
                    <i
                      className="fas fa-trash text-red-600 cursor-pointer"
                      onClick={() => deleteEquipment(equipment.id)}
                    ></i>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
