import React, { useState } from 'react';
import axios from 'axios';
import { NEXT_PUBLIC_API_URL } from '../../apiconfig';

export default function NotificationModal({ onClose }: { onClose: () => void }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const sendNotification = async () => {
    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      await axios.post(
        `${NEXT_PUBLIC_API_URL}api/Notification`,
        { title, content },
        config
      );

      alert('Gửi thông báo thành công!');
      onClose();
    } catch (error) {
      console.error('Lỗi khi gửi thông báo:', error);
      alert('Gửi thông báo thất bại!');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg w-1/3">
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-semibold text-gray-800">Notification</h3>
          <button onClick={onClose} className="text-red-500">✕</button>
        </div>
        <div className="mt-4">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
            className="w-full p-2 border rounded mb-3 text-gray-800"
          />
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Content"
            className="w-full p-2 border rounded text-gray-800"
          ></textarea>
          <button
            onClick={sendNotification}
            className="mt-3 px-4 py-2 bg-red-600 text-white rounded"
          >
            Send Notification
          </button>
        </div>
      </div>
    </div>
  );
}
