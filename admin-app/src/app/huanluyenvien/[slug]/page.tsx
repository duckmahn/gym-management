<<<<<<< HEAD
'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter, useParams } from 'next/navigation';
import { NEXT_PUBLIC_API_URL } from '../../../../apiconfig';

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

export default function Page() {
    const { slug } = useParams();
    console.log('Slug:', slug);
    const [trainer, setTrainer] = useState<Trainer | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    useEffect(() => {
        // Lấy token từ localStorage
        const token = localStorage.getItem('token');
        console.log('Token:', token);
        
        if (!token) {
            router.push('/huanluyenvien');
            return;
        }
        
        // Gọi API để lấy thông tin huấn luyện viên dựa trên slug (ID)
        axios.get(`${NEXT_PUBLIC_API_URL}/api/Trainers/${slug}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        .then((response) => {
            setTrainer(response.data);
            setLoading(false);
        })
        .catch((error) => {
            console.error('Lỗi khi lấy thông tin huấn luyện viên:', error);
            setError(`Không thể tải thông tin huấn luyện viên. Mã lỗi: ${error.response?.status}`);
            setLoading(false);
        });
    }, [slug, router]);

    // Kiểm tra nếu dữ liệu huấn luyện viên chưa tải
    if (loading) return <p>Đang tải thông tin huấn luyện viên...</p>;

    // Kiểm tra nếu có lỗi
    if (error) return <p className="text-red-500">{error}</p>;

    // Kiểm tra nếu không có huấn luyện viên
    if (!trainer) return <p>Không tìm thấy huấn luyện viên với mã này.</p>;

    return (
        <div className="max-w-md mx-auto p-5 bg-white shadow-lg rounded-lg">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Thông tin Huấn Luyện Viên</h2>
            <div className="mb-3">
                <p className="text-gray-600 font-semibold">Tên:</p>
                <p className="text-gray-800">{trainer.name}</p>
            </div>
            <div className="mb-3">
                <p className="text-gray-600 font-semibold">Email:</p>
                <p className="text-gray-800">{trainer.email}</p>
            </div>
            <div className="mb-3">
                <p className="text-gray-600 font-semibold">Số điện thoại:</p>
                <p className="text-gray-800">{trainer.phone}</p>
            </div>
            <div className="mb-3">
                <p className="text-gray-600 font-semibold">Chuyên môn:</p>
                <p className="text-gray-800">{trainer.specialty}</p>
            </div>
            <div className="mb-3">
                <p className="text-gray-600 font-semibold">Kinh nghiệm:</p>
                <p className="text-gray-800">{trainer.experience}</p>
            </div>
            <div className="mb-3">
                <p className="text-gray-600 font-semibold">Loại:</p>
                <p className="text-gray-800">{trainer.type}</p>
            </div>
        </div>
    );
=======
'use client'

import React from 'react'

export default function Page({ params}) {
    const {slug } = params
    console.log("🚀 ~ page ~ params:", slug)
    return (
        <div>
            {slug}
        </div>
    )
>>>>>>> adabf4dc840a779b0ada42e6a310dd532e39b132
}
