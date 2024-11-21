
'use client';




import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/sidebar';
import Header from '../../components/header';
import axios from 'axios';
import { NEXT_PUBLIC_API_URL } from '../../../apiconfig';
import { useRouter } from 'next/navigation';

interface Equipment {
  id: number;
  name: string;
  type: string;
  price: number;
}

export default function CSVCVaThietBi(): JSX.Element {
  const [equipments, setEquipments] = useState<Equipment[]>([]);
  const [newEquipment, setNewEquipment] = useState<Equipment>({
    id: 0,
    name: '',
    type: '',
    price: 0,
  });
  const [showForm, setShowForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
    }
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

    const fetchEquipments = async () => {
      try {
        const response = await axios.get(`${NEXT_PUBLIC_API_URL}api/Facilities`);
        setEquipments(response.data);
      } catch (error) {
        console.error('Lỗi khi lấy danh sách thiết bị:', error);
      }
    };

    fetchEquipments();
  }, [router]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewEquipment({ ...newEquipment, [name]: value });
  };

  const handleSidebarToggle = (isOpen: boolean) => {
    setIsSidebarOpen(isOpen);
  };

  const saveEquipment = async () => {
    try {
      if (isEditing) {
        await axios.put(`${NEXT_PUBLIC_API_URL}api/Facilities/${newEquipment.id}`, newEquipment);
        setEquipments(
          equipments.map((equipment) =>
            equipment.id === newEquipment.id ? newEquipment : equipment
          )
        );
      } else {
        const response = await axios.post(`${NEXT_PUBLIC_API_URL}api/Facilities`, newEquipment);
        setEquipments([...equipments, response.data]);
      }
      resetForm();
    } catch (error) {
      console.error('Lỗi khi thêm hoặc cập nhật thiết bị:', error);
    }
  };

  const resetForm = () => {
    setNewEquipment({ id: 0, name: '', type: '', price: 0 });
    setShowForm(false);
    setIsEditing(false);
  };

  const editEquipment = (id: number) => {
    const equipmentToEdit = equipments.find((equipment) => equipment.id === id);
    if (equipmentToEdit) {
      setNewEquipment(equipmentToEdit);
      setShowForm(true);
      setIsEditing(true);
    }
  };

  const deleteEquipment = async (id: number) => {
    if (confirm('Bạn có chắc muốn xóa thiết bị này?')) {
      try {
        await axios.delete(`${NEXT_PUBLIC_API_URL}api/Facilities/${id}`);
        setEquipments(equipments.filter((equipment) => equipment.id !== id));
      } catch (error) {
        console.error('Lỗi khi xóa thiết bị:', error);
      }
    }
  };


  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar active="csvc-va-thiet-bi" onToggle={handleSidebarToggle} />
      <main
        className={`flex-grow p-5 transition-all duration-300 ${
          isSidebarOpen ? 'ml-[250px]' : 'ml-0'
        }`}
      >
        <Header />
        <div className="p-5 bg-white rounded-lg shadow-md">
          <div className="flex justify-between items-center mb-5">

            <h2 className="text-2xl font-semibold text-gray-800">Danh sách thiết bị</h2>
            <button
              onClick={() => {
                setShowForm(true);
                setIsEditing(false);
              }}
              className="px-5 py-2 bg-red-600 text-white rounded-lg"
            >
              Thêm thiết bị
            </button>
          </div>

          {showForm && (
            <div className="mb-5 p-4 bg-gray-100 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                {isEditing ? 'Chỉnh sửa thiết bị' : 'Thêm thiết bị mới'}
              </h3>
              <div className="flex flex-col gap-3">
                <input
                  type="text"
                  name="name"
                  value={newEquipment.name}
                  onChange={handleInputChange}
                  placeholder="Tên thiết bị"
                  className="p-2 border rounded-lg text-black"
                />
                <input
                  type="text"
                  name="type"
                  value={newEquipment.type}
                  onChange={handleInputChange}
                  placeholder="Loại thiết bị"
                  className="p-2 border rounded-lg text-black"
                />
                <input
                  type="number"
                  name="price"
                  value={newEquipment.price}
                  onChange={handleInputChange}
                  placeholder="Giá"
                  className="p-2 border rounded-lg text-black"
                />
                <button
                  onClick={saveEquipment}
                  className="mt-3 px-5 py-2 bg-green-600 text-white rounded-lg"
                >
                  {isEditing ? 'Cập nhật' : 'Lưu'}
                </button>
                <button
                  onClick={resetForm}
                  className="mt-3 px-5 py-2 bg-gray-500 text-white rounded-lg"
                >
                  Hủy
                </button>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {equipments.map((equipment) => (
              <div key={equipment.id} className="bg-white p-5 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold text-gray-800">{equipment.name}</h3>
                <p className="text-gray-600">Loại: {equipment.type}</p>
                <p className="text-gray-600">Giá: {equipment.price}₫</p>
                <div className="flex justify-between mt-4">
                  <button
                    onClick={() => editEquipment(equipment.id)}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg"
                  >
                    Chỉnh sửa
                  </button>
                  <button
                    onClick={() => deleteEquipment(equipment.id)}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg"
                  >
                    Xóa
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
