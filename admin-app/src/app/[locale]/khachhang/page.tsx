"use client";

import React, { useState, useEffect } from "react";
import Sidebar from "@/app/[locale]/components/sidebar";
import Header from "@/app/[locale]/components/header";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { NEXT_PUBLIC_API_URL } from "../../../../apiconfig";
import { useTranslations } from "next-intl";

import { Button } from "@/app/[locale]/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/app/[locale]/components/ui/dialog";
import { Input } from "@/app/[locale]/components/ui/input";
import { Label } from "@/app/[locale]/components/ui/label";

interface Customer {
  id: number;
  name: string;
  email: string;
  phone: string;
  code: string;
  joinDate: string;
}

export default function KhachHang(): JSX.Element {
  const t = useTranslations("KhachHang");
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [newCustomer, setNewCustomer] = useState<Customer>({
    id: 0,
    name: "",
    email: "",
    phone: "",
    code: "",
    joinDate: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const router = useRouter();
  const { theme } = useTheme();

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    const fetchCustomers = async () => {
      try {
        const response = await axios.get(`${NEXT_PUBLIC_API_URL}api/Customers`);
        setCustomers(response.data);
      } catch (error) {
        console.error("Lỗi khi lấy danh sách khách hàng:", error);
      }
    };

    fetchCustomers();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewCustomer({ ...newCustomer, [name]: value });
  };

  const addCustomer = async () => {
    try {
      if (isEditing) {
        await axios.put(
          `${NEXT_PUBLIC_API_URL}api/Customers/${newCustomer.id}`,
          newCustomer
        );
        setCustomers(
          customers.map((customer) =>
            customer.id === newCustomer.id ? newCustomer : customer
          )
        );
      } else {
        const response = await axios.post(
          `${NEXT_PUBLIC_API_URL}api/Customers`,
          newCustomer
        );
        setCustomers([...customers, response.data]);
      }
      setNewCustomer({
        id: 0,
        name: "",
        email: "",
        phone: "",
        code: "",
        joinDate: "",
      });
      setIsEditing(false);
      setIsDialogOpen(false);
    } catch (error) {
      console.error("Lỗi khi thêm hoặc cập nhật khách hàng:", error);
    }
  };

  const editCustomer = (id: number) => {
    const customerToEdit = customers.find((customer) => customer.id === id);
    if (customerToEdit) {
      setNewCustomer(customerToEdit);
      setIsEditing(true);
      setIsDialogOpen(true);
    }
  };

  const deleteCustomer = async (id: number) => {
    if (confirm("Bạn có chắc muốn xóa khách hàng này?")) {
      try {
        await axios.delete(`${NEXT_PUBLIC_API_URL}api/Customers/${id}`);
        setCustomers(customers.filter((customer) => customer.id !== id));
      } catch (error) {
        console.error("Lỗi khi xóa khách hàng:", error);
      }
    }
  };

  return (
    <div
      className={`flex h-screen ${
        theme === "dark" ? "bg-gray-900" : "bg-gray-100"
      }`}
    >
      <Sidebar active="khach-hang" />
      <main className="flex-grow p-5">
        <Header />
        <div
          className={`p-5 rounded-lg shadow-md ${
            theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-black"
          }`}
        >
          <div className="flex justify-between items-center mb-5">
            <h2 className="text-2xl font-semibold">{t("listuser")}</h2>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button
                  onClick={() => {
                    setIsEditing(false);
                    setIsDialogOpen(true);
                  }}
                >
                  {t("adduser")}
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>
                    {isEditing ? t("updateuser") : t("addnewuser")}
                  </DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right">
                      {t("name")}
                    </Label>
                    <Input
                      id="name"
                      name={t("name")}
                      value={newCustomer.name}
                      onChange={handleInputChange}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="email" className="text-right">
                      Email
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      value={newCustomer.email}
                      onChange={handleInputChange}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="phone" className="text-right">
                      {t("phone")}
                    </Label>
                    <Input
                      id="phone"
                      name="phone"
                      value={newCustomer.phone}
                      onChange={handleInputChange}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="code" className="text-right">
                      {t("iduser")}
                    </Label>
                    <Input
                      id="code"
                      name="code"
                      value={newCustomer.code}
                      onChange={handleInputChange}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="joinDate" className="text-right">
                      {t("joindate")}
                    </Label>
                    <Input
                      id="joinDate"
                      type="date"
                      name="joinDate"
                      value={newCustomer.joinDate}
                      onChange={handleInputChange}
                      className="col-span-3"
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button onClick={addCustomer}>
                    {isEditing ? t("update") : t("save")}
                  </Button>
                  <Button
                    variant="secondary"
                    onClick={() => setIsDialogOpen(false)}
                  >
                    {t("cancel")}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          <table className="w-full border-collapse">
            <thead>
              <tr
                className={`border-b ${
                  theme === "dark"
                    ? "bg-gray-700 text-white"
                    : "bg-gray-100 text-black"
                }`}
              >
                <th>{t("name")}</th>
                <th>{t("email")}</th>
                <th>{t("phone")}</th>
                <th>{t("iduser")}</th>
                <th>{t("joindate")}</th>
                <th>{t("action")}</th>
              </tr>
            </thead>
            <tbody>
              {customers.map((customer) => (
                <tr key={customer.id} className="border-b">
                  <td>{customer.name}</td>
                  <td>{customer.email}</td>
                  <td>{customer.phone}</td>
                  <td>{customer.code}</td>
                  <td>{customer.joinDate}</td>
                  <td className="flex gap-2">
                    <i
                      className="fas fa-edit text-red-600 cursor-pointer"
                      onClick={() => editCustomer(customer.id)}
                    ></i>
                    <i
                      className="fas fa-trash text-red-600 cursor-pointer"
                      onClick={() => deleteCustomer(customer.id)}
                    ></i>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
