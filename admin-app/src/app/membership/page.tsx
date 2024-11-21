"use client";
import React, { useState, useEffect } from "react";
import Sidebar from "../../components/sidebar";
import Header from "../../components/header";
import { useTheme } from "next-themes";

interface Membership {
  id: number;
  type: string;
  price: number;
  description: string;
  startDate: string;
  endDate: string;
}

export default function MembershipPage(): JSX.Element {
  const [memberships, setMemberships] = useState<Membership[]>([]);
  const [newMembership, setNewMembership] = useState<Membership>({
    id: 0,
    type: "",
    price: 0,
    description: "",
    startDate: "",
    endDate: "",
  });
  const [showForm, setShowForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const { theme } = useTheme();

  useEffect(() => {
    fetchMemberships();
  }, []);

  const fetchMemberships = async () => {
    try {
      const response = await fetch(
        "https://api.nosteable.works/api/Membership"
      );
      const data = await response.json();
      setMemberships(data);
    } catch (error) {
      console.error("Lỗi khi tải dữ liệu membership:", error);
    }
  };

  const addMembershipAPI = async () => {
    try {
      await fetch("https://api.nosteable.works/api/Membership", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newMembership),
      });
      fetchMemberships();
      setNewMembership({
        id: 0,
        type: "",
        price: 0,
        description: "",
        startDate: "",
        endDate: "",
      });
      setShowForm(false);
    } catch (error) {
      console.error("Lỗi khi thêm membership:", error);
    }
  };

  const updateMembershipAPI = async () => {
    try {
      await fetch(`https://api.nosteable.works/api/Membership/${editingId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newMembership),
      });
      fetchMemberships();
      setNewMembership({
        id: 0,
        type: "",
        price: 0,
        description: "",
        startDate: "",
        endDate: "",
      });
      setShowForm(false);
      setIsEditing(false);
      setEditingId(null);
    } catch (error) {
      console.error("Lỗi khi cập nhật membership:", error);
    }
  };

  const deleteMembershipAPI = async (id: number) => {
    try {
      await fetch(`https://api.nosteable.works/api/Membership/${id}`, {
        method: "DELETE",
      });
      fetchMemberships();
    } catch (error) {
      console.error("Lỗi khi xóa membership:", error);
    }
  };

  const handleSaveMembership = () => {
    if (isEditing) {
      updateMembershipAPI();
    } else {
      addMembershipAPI();
    }
  };

  const editMembership = (id: number) => {
    const membershipToEdit = memberships.find(
      (membership) => membership.id === id
    );
    if (membershipToEdit) {
      setNewMembership(membershipToEdit);
      setIsEditing(true);
      setEditingId(id);
      setShowForm(true);
    }
  };

  const deleteMembership = (id: number) => {
    if (confirm("Bạn có chắc muốn xóa membership này?")) {
      deleteMembershipAPI(id);
    }
  };

  return (
    <div
      className={`flex h-screen ${
        theme === "dark" ? "bg-gray-900 text-white" : "bg-gray-100 text-black"
      }`}
    >
      <Sidebar active="membership" />
      <main className="flex-grow p-5">
        <Header />
        <div
          className={`p-5 rounded-lg shadow-md ${
            theme === "dark" ? "bg-gray-800" : "bg-white"
          }`}
        >
          <div className="flex justify-between items-center mb-5">
            <h2 className="text-2xl font-semibold">Danh sách Membership</h2>
            <button
              onClick={() => {
                setShowForm(true);
                setIsEditing(false);
                setNewMembership({
                  id: 0,
                  type: "",
                  price: 0,
                  description: "",
                  startDate: "",
                  endDate: "",
                });
              }}
              className={`px-5 py-2 rounded-lg ${
                theme === "dark" ? "bg-red-500" : "bg-red-600 text-white"
              }`}
            >
              Thêm Membership
            </button>
          </div>

          {showForm && (
            <div
              className={`mb-5 p-5 rounded-lg ${
                theme === "dark" ? "bg-gray-700" : "bg-gray-100"
              }`}
            >
              <h3 className="text-lg font-semibold mb-2">
                {isEditing ? "Chỉnh sửa Membership" : "Thêm Membership Mới"}
              </h3>
              <input
                type="text"
                placeholder="Loại"
                value={newMembership.type}
                onChange={(e) =>
                  setNewMembership({ ...newMembership, type: e.target.value })
                }
                className={`border rounded w-full px-3 py-2 mb-2 ${
                  theme === "dark" ? "bg-gray-600 text-white" : "text-black"
                } placeholder:text-gray-400`}
              />
              <input
                type="number"
                placeholder="Giá"
                value={newMembership.price}
                onChange={(e) =>
                  setNewMembership({
                    ...newMembership,
                    price: Number(e.target.value),
                  })
                }
                className={`border rounded w-full px-3 py-2 mb-2 ${
                  theme === "dark" ? "bg-gray-600 text-white" : "text-black"
                } placeholder:text-gray-400`}
              />
              <input
                type="text"
                placeholder="Mô tả"
                value={newMembership.description}
                onChange={(e) =>
                  setNewMembership({
                    ...newMembership,
                    description: e.target.value,
                  })
                }
                className={`border rounded w-full px-3 py-2 mb-2 ${
                  theme === "dark" ? "bg-gray-600 text-white" : "text-black"
                } placeholder:text-gray-400`}
              />
              <input
                type="date"
                name="startDate"
                value={newMembership.startDate}
                onChange={(e) =>
                  setNewMembership({
                    ...newMembership,
                    startDate: e.target.value,
                  })
                }
                className={`border rounded w-full px-3 py-2 mb-2 ${
                  theme === "dark" ? "bg-gray-600 text-white" : "text-black"
                } placeholder:text-gray-400`}
              />
              <input
                type="date"
                name="endDate"
                value={newMembership.endDate}
                onChange={(e) =>
                  setNewMembership({
                    ...newMembership,
                    endDate: e.target.value,
                  })
                }
                className={`border rounded w-full px-3 py-2 mb-2 ${
                  theme === "dark" ? "bg-gray-600 text-white" : "text-black"
                } placeholder:text-gray-400`}
              />
              <button
                onClick={handleSaveMembership}
                className="px-5 py-2 bg-green-600 text-white rounded-lg"
              >
                {isEditing ? "Cập nhật" : "Thêm"}
              </button>
              <button
                onClick={() => setShowForm(false)}
                className="px-5 py-2 bg-gray-400 text-white rounded-lg ml-2"
              >
                Hủy
              </button>
            </div>
          )}

          <div
            className={`flex gap-5 flex-wrap ${
              theme === "dark" ? "bg-gray-800" : "bg-white"
            }`}
          >
            {memberships.map((membership) => (
              <div
                key={membership.id}
                className={`p-5 rounded-lg shadow-md text-left min-w-[250px] ${
                  theme === "dark" ? "bg-gray-700" : "bg-white"
                }`}
              >
                <h3
                  className={`text-lg font-semibold mb-2 ${
                    theme === "dark" ? "text-white" : "text-gray-600"
                  }`}
                >
                  {membership.type}
                </h3>
                <hr className="border-t border-gray-300 my-2" />
                <p
                  className={`text-base mb-1 ${
                    theme === "dark" ? "text-white" : "text-black"
                  }`}
                >
                  Giá: {membership.price}₫
                </p>
                <p
                  className={`text-base ${
                    theme === "dark" ? "text-white" : "text-black"
                  }`}
                >
                  Mô tả: {membership.description}
                </p>
                <p
                  className={`text-base ${
                    theme === "dark" ? "text-white" : "text-black"
                  }`}
                >
                  Ngày bắt đầu: {membership.startDate}
                </p>
                <p
                  className={`text-base ${
                    theme === "dark" ? "text-white" : "text-black"
                  }`}
                >
                  Ngày kết thúc: {membership.endDate}
                </p>
                <div className="flex justify-between items-center mt-3">
                  <button className="px-3 py-1 bg-red-600 text-white rounded-lg">
                    Chi Tiết
                  </button>
                  <div className="flex items-center">
                    <i
                      className="fas fa-edit text-red-600 cursor-pointer mr-2"
                      onClick={() => editMembership(membership.id)}
                    ></i>
                    <i
                      className="fas fa-trash text-red-600 cursor-pointer"
                      onClick={() => deleteMembership(membership.id)}
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
