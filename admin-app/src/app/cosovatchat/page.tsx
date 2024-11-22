'use client';

import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/sidebar';
import Header from '../../components/header';
import axios from 'axios';
import Cookies from 'js-cookie'; 
import { NEXT_PUBLIC_API_URL } from '../../../apiconfig';
import { useRouter } from 'next/navigation';

interface Facility {
  id: string;
  name: string;
  description: string;
  status: string;
  lastMaintenanceDate: string;
}

export default function CSVCVaThietBi(): JSX.Element {
  const [facilities, setFacilities] = useState<Facility[]>([]);
  const [newFacility, setNewFacility] = useState<Facility>({
    id: '',
    name: '',
    description: '',
    status: '',
    lastMaintenanceDate: '',
  });
  const [showForm, setShowForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const token = Cookies.get('token');
    if (!token) {
      router.push('/login');
    }
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

    const fetchFacilities = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`${NEXT_PUBLIC_API_URL}api/Facilities`);
        setFacilities(response.data);
      } catch (error) {
        console.error('Lỗi khi lấy danh sách cơ sở vật chất:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFacilities();
  }, [router]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewFacility({ ...newFacility, [name]: value });
  };

  const handleSidebarToggle = (isOpen: boolean) => {
    setIsSidebarOpen(isOpen);
  };

  const saveFacility = async () => {
    try {
      if (isEditing) {
        await axios.put(`${NEXT_PUBLIC_API_URL}api/Facilities/${newFacility.id}`, newFacility);
        setFacilities(
          facilities.map((facility) =>
            facility.id === newFacility.id ? newFacility : facility
          )
        );
      } else {
        const response = await axios.post(`${NEXT_PUBLIC_API_URL}api/Facilities`, newFacility);
        setFacilities([...facilities, response.data]);
      }
      resetForm();
    } catch (error) {
      console.error('Lỗi khi thêm hoặc cập nhật cơ sở vật chất:', error);
    }
  };

  const resetForm = () => {
    setNewFacility({ id: '', name: '', description: '', status: '', lastMaintenanceDate: '' });
    setShowForm(false);
    setIsEditing(false);
  };

  const editFacility = (id: string) => {
    const facilityToEdit = facilities.find((facility) => facility.id === id);
    if (facilityToEdit) {
      setNewFacility(facilityToEdit);
      setShowForm(true);
      setIsEditing(true);
    }
  };

  const deleteFacility = async (id: string) => {
    if (confirm('Bạn có chắc muốn xóa cơ sở vật chất này?')) {
      try {
        await axios.delete(`${NEXT_PUBLIC_API_URL}api/Facilities/${id}`);
        setFacilities(facilities.filter((facility) => facility.id !== id));
      } catch (error) {
        console.error('Lỗi khi xóa cơ sở vật chất:', error);
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
          {isLoading ? (
            <div className="text-center">
              <p className="text-lg font-semibold text-gray-600">Đang tải dữ liệu...</p>
            </div>
          ) : (
            <>
              <div className="flex justify-between items-center mb-5">
                <h2 className="text-2xl font-semibold text-gray-800">Danh sách cơ sở vật chất</h2>
                <button
                  onClick={() => {
                    setShowForm(true);
                    setIsEditing(false);
                  }}
                  className="px-5 py-2 bg-red-600 text-white rounded-lg"
                >
                  Thêm cơ sở vật chất
                </button>
              </div>

              {showForm && (
                <div className="mb-5 p-4 bg-gray-100 rounded-lg">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    {isEditing ? 'Chỉnh sửa cơ sở vật chất' : 'Thêm cơ sở vật chất mới'}
                  </h3>
                  <div className="flex flex-col gap-3">
                    <input
                      type="text"
                      name="name"
                      value={newFacility.name}
                      onChange={handleInputChange}
                      placeholder="Tên cơ sở vật chất"
                      className="p-2 border rounded-lg text-black"
                    />
                    <input
                      type="text"
                      name="description"
                      value={newFacility.description}
                      onChange={handleInputChange}
                      placeholder="Mô tả"
                      className="p-2 border rounded-lg text-black"
                    />
                    <input
                      type="text"
                      name="status"
                      value={newFacility.status}
                      onChange={handleInputChange}
                      placeholder="Trạng thái"
                      className="p-2 border rounded-lg text-black"
                    />
                    <input
                      type="datetime-local"
                      name="lastMaintenanceDate"
                      value={newFacility.lastMaintenanceDate}
                      onChange={handleInputChange}
                      className="p-2 border rounded-lg text-black"
                    />
                    <button
                      onClick={saveFacility}
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
                {facilities.map((facility) => (
                  <div key={facility.id} className="bg-white p-5 rounded-lg shadow-md">
                    <h3 className="text-xl font-semibold text-gray-800">{facility.name}</h3>
                    <p className="text-gray-600 font-bold">Mô tả: {facility.description}</p>
                    <p className="text-gray-600 font-bold">Trạng thái: {facility.status}</p>
                    <p className="text-gray-600 font-bold">Ngày bảo trì: {facility.lastMaintenanceDate}</p>
                    <td className="flex gap-2">
                        <i
                          className="fas fa-edit text-red-600 cursor-pointer"
                          onClick={() => editFacility(facility.id)}
                        ></i>
                        <i
                          className="fas fa-trash text-red-600 cursor-pointer"
                          onClick={() => deleteFacility(facility.id)}
                        ></i>
                      </td>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
}
