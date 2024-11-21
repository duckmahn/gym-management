"use client";
import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/sidebar';
import Header from '../../components/header';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import axios from 'axios';
import { NEXT_PUBLIC_API_URL } from '../../../apiconfig';

interface Equipment {
  id: number;
  name: string;
  type: string;
  price: number;
}

export default function CSVCVaThietBi(): JSX.Element {
  const [equipments, setEquipments] = useState<Equipment[]>([]);
  const [newEquipment, setNewEquipment] = useState<Equipment>({ id: 0, name: '', type: '', price: 0 });
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const router = useRouter();

  // Fetch equipment from the API
  useEffect(() => {
    fetchEquipments();
  }, []);

  const fetchEquipments = async () => {
    try {
      const response = await axios.get(`${NEXT_PUBLIC_API_URL}/api/facilities`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`, // Add token to header
          'Content-Type': 'application/json',
        }
      });
      setEquipments(response.data);
    } catch (error) {
      console.error("Error loading equipment data:", error);
    }
  };

  const addEquipmentAPI = async () => {
    try {
      await axios.post(`${NEXT_PUBLIC_API_URL}/api/facilities`, newEquipment, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`, // Add token to header
          'Content-Type': 'application/json',
        }
      });
      fetchEquipments();
      setNewEquipment({ id: 0, name: '', type: '', price: 0 });
      setIsAdding(false);
    } catch (error) {
      console.error("Error adding equipment:", error);
    }
  };

  const updateEquipmentAPI = async () => {
    try {
      await axios.put(`${NEXT_PUBLIC_API_URL}/api/facilities/${editingId}`, newEquipment, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`, // Add token to header
          'Content-Type': 'application/json',
        }
      });
      fetchEquipments();
      setNewEquipment({ id: 0, name: '', type: '', price: 0 });
      setIsAdding(false);
      setIsEditing(false);
      setEditingId(null);
    } catch (error) {
      console.error("Error updating equipment:", error);
    }
  };

  const deleteEquipmentAPI = async (id: number) => {
    try {
      await axios.delete(`${NEXT_PUBLIC_API_URL}/api/facilities/${id}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`, // Add token to header
        }
      });
      fetchEquipments();
    } catch (error) {
      console.error("Error deleting equipment:", error);
    }
  };

  const handleSaveEquipment = () => {
    if (isEditing) {
      updateEquipmentAPI();
    } else {
      addEquipmentAPI();
    }
  };

  // Handle edit equipment
  const editEquipment = (id: number) => {
    const equipmentToEdit = equipments.find(equipment => equipment.id === id);
    if (equipmentToEdit) {
      setNewEquipment(equipmentToEdit);
      setIsEditing(true);
      setEditingId(id);
      setIsAdding(true);
    }
  };

  // Handle delete equipment
  const deleteEquipment = (id: number) => {
    if (confirm('Are you sure you want to delete this equipment?')) {
      deleteEquipmentAPI(id);
    }
  };

  // Redirect handling
  const handlePush = (id: number) => {
    router.push(`/cosovatchat/${id}`);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar active="csvc-va-thiet-bi" onToggle={setIsSidebarOpen} />
      <main className={`flex-grow p-5 transition-all duration-300 ${
          isSidebarOpen ? 'ml-[250px]' : 'ml-0'
        }`}>
        <Header />
        <div
          className={`p-5 rounded-lg shadow-md ${
            theme === "dark" ? "bg-gray-800" : "bg-white"
          }`}
        >
          <div className="flex justify-between items-center mb-5">
            <h2 className="text-2xl font-semibold text-gray-800">Danh sách thiết bị và CSVC</h2>
            <div className="flex gap-3">
              <button onClick={() => { setIsAdding(true); setIsEditing(false); setNewEquipment({ id: 0, name: '', type: '', price: 0 }); }} className="px-5 py-2 bg-red-600 text-white rounded-lg">
                Thêm CSVC và thiết bị
              </button>
              <button onClick={() => handlePush(newEquipment.id)} className="px-5 py-2 bg-red-600 text-white rounded-lg">
                Redirect
              </button>
            </div>
          </div>

          {isAdding && (
            <div className="mb-5 p-5 bg-gray-100 rounded-lg">
              <h3 className="text-lg font-semibold text-black mb-2">{isEditing ? 'Chỉnh sửa Thiết Bị' : 'Thêm Thiết Bị Mới'}</h3>
              <input type="text" placeholder="Tên" value={newEquipment.name} onChange={(e) => setNewEquipment({ ...newEquipment, name: e.target.value })} className="border rounded w-full px-3 py-2 mb-2 text-black placeholder:text-black" />
              <input type="text" placeholder="Loại" value={newEquipment.type} onChange={(e) => setNewEquipment({ ...newEquipment, type: e.target.value })} className="border rounded w-full px-3 py-2 mb-2 text-black placeholder:text-black" />
              <input type="number" placeholder="Giá" value={newEquipment.price} onChange={(e) => setNewEquipment({ ...newEquipment, price: Number(e.target.value) })} className="border rounded w-full px-3 py-2 mb-2 text-black placeholder:text-black" />
              <button onClick={handleSaveEquipment} className="px-5 py-2 bg-green-600 text-white rounded-lg">{isEditing ? 'Cập nhật' : 'Thêm'}</button>
              <button onClick={() => setIsAdding(false)} className="px-5 py-2 bg-gray-400 text-white rounded-lg ml-2">Hủy</button>
            </div>
          )}

          <div className="flex gap-5 flex-wrap">
            {equipments.map(equipment => (
              <div key={equipment.id} className="bg-white p-5 rounded-lg shadow-md text-left min-w-[250px]">
                <h3 className="text-lg font-semibold text-gray-600 mb-2">{equipment.name}</h3>
                <hr className="border-t border-gray-300 my-2" />
                <p className="text-base text-black mb-1">{equipment.type}</p>
                <p className="text-base text-black">Giá: {equipment.price}₫</p>
                <div className="flex justify-between items-center mt-3">
                  <Link href={`/csvc/${equipment.id}`}>
                    <button className="px-3 py-1 bg-red-600 text-white rounded-lg">Chi Tiết</button>
                  </Link>
                  <div className="flex items-center">
                    <i className="fas fa-edit text-red-600 cursor-pointer mr-2" onClick={() => editEquipment(equipment.id)}></i>
                    <i className="fas fa-trash text-red-600 cursor-pointer" onClick={() => deleteEquipment(equipment.id)}></i>
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
