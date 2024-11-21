'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import { NEXT_PUBLIC_API_URL } from '../../../../apiconfig';


interface PageProps {
  params: {
    slug: string;
  };
}

interface Customer {
  name: string;
  email: string;
  phone: string;
  code: string;
  joinDate: string;
}

export default function CustomerProfilePage({ params }: PageProps) {
  const { slug } = params;
  console.log(params.slug)
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    // Lấy token từ localStorage
    const token = localStorage.getItem('token');

    // Nếu không có token, chuyển hướng tới trang đăng nhập
    if (!token) {
        router.push('/khachhang');
        return;
      }
    // Gọi API để lấy thông tin khách hàng dựa trên slug (ID) và thêm token vào headers
    axios
      .get(`${NEXT_PUBLIC_API_URL}/api/Customers/${slug}`, {
        headers: {
          Authorization: token ? `Bearer ${token}` : '', // Gắn token vào header nếu có
        },
      })
      .then((response) => {
        setCustomer(response.data);
        setLoading(false);
    })
      .catch((error) => {
        console.error('Lỗi khi lấy thông tin khách hàng:', error);
        setError('Không thể tải thông tin khách hàng.');
        setLoading(false);
      });
  }, [router, slug]);

  // Kiểm tra nếu dữ liệu khách hàng chưa tải
  if (loading) return <p>Đang tải thông tin khách hàng...</p>;

  // Kiểm tra nếu có lỗi
  if (error) return <p className="text-red-500">{error}</p>;

  // Kiểm tra nếu không có khách hàng
  if (!customer) return <p>Không tìm thấy khách hàng với mã này.</p>;

  return (
    <div className="max-w-md mx-auto p-5 bg-white shadow-lg rounded-lg">
      <h2 className="text-3xl font-bold text-gray-800 mb-4">Thông tin Khách Hàng</h2>
      <div className="mb-3">
        <p className="text-gray-600 font-semibold">Tên:</p>
        <p className="text-gray-800">{customer.name}</p>
      </div>
      <div className="mb-3">
        <p className="text-gray-600 font-semibold">Email:</p>
        <p className="text-gray-800">{customer.email}</p>
      </div>
      <div className="mb-3">
        <p className="text-gray-600 font-semibold">Số điện thoại:</p>
        <p className="text-gray-800">{customer.phone}</p>
      </div>
      <div className="mb-3">
        <p className="text-gray-600 font-semibold">Mã khách hàng:</p>
        <p className="text-gray-800">{customer.code}</p>
      </div>
      <div className="mb-3">
        <p className="text-gray-600 font-semibold">Ngày gia nhập:</p>
        <p className="text-gray-800">{customer.joinDate}</p>
      </div>
    </div>
  );
}
