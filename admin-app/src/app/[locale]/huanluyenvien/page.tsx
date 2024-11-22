"use client";

import Sidebar from "@/app/[locale]/components/sidebar";
import Header from "@/app/[locale]/components/header";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { useTranslations } from "next-intl";
import Cookies from "js-cookie";

import { Button } from "@/app/[locale]/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/app/[locale]/components/ui/dialog";
import { Input } from "@/app/[locale]/components/ui/input";
import { Label } from "@/app/[locale]/components/ui/label";

interface Trainer {
  id: number;
  name: string;
  email: string;
  phone: string;
  code: string;
  joinDate: string;
}

export default function HuanLuyenVien(): JSX.Element {
  const t = useTranslations("HuanLuyenVien");
  const [trainers, setTrainers] = useState<Trainer[]>([]);
  const [newTrainer, setNewTrainer] = useState<Trainer>({
    id: 0,
    name: "",
    email: "",
    phone: "",
    code: "",
    joinDate: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const [isThemeLoaded, setIsThemeLoaded] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchTrainers = async () => {
      try {
        const response = await axios.get(
          "https://api.nosteable.works/api/Trainers"
        );
        setTrainers(response.data);
      } catch (error) {
        console.error("Lỗi khi tải dữ liệu:", error);
      }
    };
    fetchTrainers();
  }, []);

  useEffect(() => {
    const savedTheme = Cookies.get("theme");
    if (savedTheme) {
      setTheme(savedTheme); // Đọc theme từ cookie
    }
    setIsThemeLoaded(true); // Đánh dấu rằng theme đã được tải
  }, [setTheme]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewTrainer({ ...newTrainer, [name]: value });
  };

  const saveTrainer = async () => {
    try {
      if (isEditing) {
        await axios.put(
          `https://api.nosteable.works/api/Trainers/${newTrainer.id}`,
          newTrainer
        );
        setTrainers(
          trainers.map((trainer) =>
            trainer.id === newTrainer.id ? newTrainer : trainer
          )
        );
      } else {
        const response = await axios.post(
          "https://api.nosteable.works/api/Trainers",
          newTrainer
        );
        setTrainers([...trainers, response.data]);
      }
      resetDialog();
    } catch (error) {
      console.error("Lỗi khi lưu dữ liệu:", error);
    }
  };

  const editTrainer = (trainer: Trainer) => {
    setNewTrainer(trainer);
    setIsEditing(true);
    setIsDialogOpen(true);
  };

  const resetDialog = () => {
    setNewTrainer({
      id: 0,
      name: "",
      email: "",
      phone: "",
      code: "",
      joinDate: "",
    });
    setIsEditing(false);
    setIsDialogOpen(false);
  };

  const deleteTrainer = async (id: number) => {
    if (confirm("Bạn có chắc muốn xóa huấn luyện viên này?")) {
      try {
        await axios.delete(`https://api.nosteable.works/api/Trainers/${id}`);
        setTrainers(trainers.filter((trainer) => trainer.id !== id));
      } catch (error) {
        console.error("Lỗi khi xóa dữ liệu:", error);
      }
    }
  };

  if (!isThemeLoaded) {
    return null; // Không render gì cho đến khi theme được xác định
  }

  return (
    <div
      className={`flex h-screen ${
        theme === "dark" ? "bg-gray-900" : "bg-gray-100"
      }`}
    >
      <Sidebar active="huan-luyen-vien" />
      <main className="flex-grow p-5">
        <Header />
        <div
          className={`p-5 rounded-lg shadow-md ${
            theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-black"
          }`}
        >
          <div className="flex justify-between items-center mb-5">
            <h2 className="text-2xl font-semibold">{t("listtrainer")}</h2>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button
                  onClick={() => {
                    setIsEditing(false);
                    setIsDialogOpen(true);
                  }}
                >
                  {t("addtrainer")}
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>
                    {isEditing ? t("updatetrainer") : t("addnewtrainer")}
                  </DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div>
                    <Label htmlFor="name">{t("name")}</Label>
                    <Input
                      id="name"
                      name="name"
                      value={newTrainer.name}
                      onChange={handleInputChange}
                      placeholder={t("name")}
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      value={newTrainer.email}
                      onChange={handleInputChange}
                      placeholder="Email"
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">{t("phone")}</Label>
                    <Input
                      id="phone"
                      name="phone"
                      value={newTrainer.phone}
                      onChange={handleInputChange}
                      placeholder={t("phone")}
                    />
                  </div>
                  <div>
                    <Label htmlFor="code">{t("idtrainer")}</Label>
                    <Input
                      id="code"
                      name="code"
                      value={newTrainer.code}
                      onChange={handleInputChange}
                      placeholder={t("idtrainer")}
                    />
                  </div>
                  <div>
                    <Label htmlFor="joinDate">{t("joindate")}</Label>
                    <Input
                      id="joinDate"
                      type="date"
                      name="joinDate"
                      value={newTrainer.joinDate}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button onClick={saveTrainer}>
                    {isEditing ? t("update") : t("save")}
                  </Button>
                  <Button variant="secondary" onClick={resetDialog}>
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
                <th className="p-4">{t("name")}</th>
                <th className="p-4">Email</th>
                <th className="p-4">{t("phone")}</th>
                <th className="p-4">{t("idtrainer")}</th>
                <th className="p-4">{t("joindate")}</th>
                <th className="p-4">{t("action")}</th>
              </tr>
            </thead>
            <tbody>
              {trainers.map((trainer) => (
                <tr key={trainer.id} className="border-b">
                  <td className="p-4">{trainer.name}</td>
                  <td className="p-4">{trainer.email}</td>
                  <td className="p-4">{trainer.phone}</td>
                  <td className="p-4">{trainer.code}</td>
                  <td className="p-4">{trainer.joinDate}</td>
                  <td className="flex gap-2 p-4">
                    <i
                      className="fas fa-edit text-red-600 cursor-pointer"
                      onClick={() => editTrainer(trainer)}
                    ></i>
                    <i
                      className="fas fa-trash text-red-600 cursor-pointer"
                      onClick={() => deleteTrainer(trainer.id)}
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
