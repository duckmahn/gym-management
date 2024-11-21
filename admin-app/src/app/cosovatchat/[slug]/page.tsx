'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useRouter } from 'next/navigation';
import { NEXT_PUBLIC_API_URL } from '../../../../apiconfig';

interface Equipment {
  name: string;
  type: string;
  price: number;
}
interface PageProps {
  params: {
    slug: string;
  };
}

export default function EquipmentDetailPage({}: PageProps) {
  const { slug } = useParams(); 
  const [equipment, setEquipment] = useState<Equipment | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    
    if (!token) {
      router.push('/cosovatchat'); // Nếu không có token, chuyển hướng về trang cơ sở vật chất
      return;
    }

    // Gọi API để lấy thông tin thiết bị dựa trên slug (ID)
    axios
      .get(`${NEXT_PUBLIC_API_URL}/api/facilities/${slug}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setEquipment(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Lỗi khi lấy thông tin thiết bị:', error);
        setError('Không thể tải thông tin thiết bị.');
        setLoading(false);
      });
  }, [slug, router]);

  if (loading) return <p>Đang tải thông tin thiết bị...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!equipment) return <p>Không tìm thấy thiết bị với mã này.</p>;

  return (
    <div className="max-w-md mx-auto p-5 bg-white shadow-lg rounded-lg">
      <h2 className="text-3xl font-bold text-gray-800 mb-4">Thông tin Thiết Bị</h2>
      <div className="mb-3">
        <p className="text-gray-600 font-semibold">Tên thiết bị:</p>
        <p className="text-gray-800">{equipment.name}</p>
      </div>
      <div className="mb-3">
        <p className="text-gray-600 font-semibold">Loại:</p>
        <p className="text-gray-800">{equipment.type}</p>
      </div>
      <div className="mb-3">
        <p className="text-gray-600 font-semibold">Giá:</p>
        <p className="text-gray-800">{equipment.price}₫</p>
      </div>
    </div>
  );
}
