"use client";
import React, { useState, useEffect } from "react";
import Sidebar from "@/app/[locale]/components/sidebar";
import Header from "@/app/[locale]/components/header";
import axios from "axios";
import { useTheme } from "next-themes";
import Cookies from "js-cookie";
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

interface Equipment {
  id: number;
  name: string;
  type: string;
  price: number;
}

export default function CSVCVaThietBi(): JSX.Element {
  const t = useTranslations("CSVCVaThietBi");
  const [equipments, setEquipments] = useState<Equipment[]>([]);
  const [newEquipment, setNewEquipment] = useState<Equipment>({
    id: 0,
    name: "",
    type: "",
    price: 0,
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const [isThemeLoaded, setIsThemeLoaded] = useState(false);

  useEffect(() => {
    const savedTheme = Cookies.get("theme");
    if (savedTheme) {
      setTheme(savedTheme);
    }
    setIsThemeLoaded(true);
  }, [setTheme]);

  useEffect(() => {
    if (theme) {
      Cookies.set("theme", theme);
    }
  }, [theme]);

  useEffect(() => {
    fetchEquipments();
  }, []);

  const fetchEquipments = async () => {
    try {
      const response = await axios.get(
        `${NEXT_PUBLIC_API_URL}/api/Facilities`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        }
      );
      setEquipments(response.data);
    } catch (error) {
      console.error("Error loading equipment data:", error);
    }
  };

  const saveEquipment = async () => {
    try {
      if (isEditing) {
        await axios.put(
          `${NEXT_PUBLIC_API_URL}/api/Facilities/${editingId}`,
          newEquipment,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
              "Content-Type": "application/json",
            },
          }
        );
      } else {
        await axios.post(
          `${NEXT_PUBLIC_API_URL}/api/facilities`,
          newEquipment,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
              "Content-Type": "application/json",
            },
          }
        );
      }
      fetchEquipments();
      resetDialog();
    } catch (error) {
      console.error(
        isEditing ? "Error updating equipment" : "Error adding equipment",
        error
      );
    }
  };

  const deleteEquipmentAPI = async (id: number) => {
    try {
      await axios.delete(`${NEXT_PUBLIC_API_URL}/api/Facilities/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      fetchEquipments();
    } catch (error) {
      console.error("Error deleting equipment:", error);
    }
  };

  const openEditDialog = (equipment: Equipment) => {
    setIsEditing(true);
    setEditingId(equipment.id);
    setNewEquipment(equipment);
    setIsDialogOpen(true);
  };

  const resetDialog = () => {
    setNewEquipment({ id: 0, name: "", type: "", price: 0 });
    setIsEditing(false);
    setEditingId(null);
    setIsDialogOpen(false);
  };
  if (!isThemeLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <div
      className={`flex h-screen ${
        theme === "dark" ? "bg-gray-900" : "bg-gray-100"
      }`}
    >
      <Sidebar active="csvc-va-thiet-bi" onToggle={setIsSidebarOpen} />
      <main
        className={`flex-grow p-5 transition-all duration-300 ${
          isSidebarOpen ? "ml-[250px]" : "ml-0"
        }`}
      >
        <Header />
        <div
          className={`p-5 rounded-lg shadow-md ${
            theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-black"
          }`}
        >
          <div className="flex justify-between items-center mb-5">
            <h2 className="text-2xl font-semibold">{t("listofdevices")}</h2>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" onClick={() => setIsDialogOpen(true)}>
                  {t("addlistofdevices")}
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>
                    {isEditing ? t("updatedevice") : t("addnewdevice")}
                  </DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right">
                      {t("name")}
                    </Label>
                    <Input
                      id="name"
                      value={newEquipment.name}
                      onChange={(e) =>
                        setNewEquipment({
                          ...newEquipment,
                          name: e.target.value,
                        })
                      }
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="type" className="text-right">
                      {t("type")}
                    </Label>
                    <Input
                      id="type"
                      value={newEquipment.type}
                      onChange={(e) =>
                        setNewEquipment({
                          ...newEquipment,
                          type: e.target.value,
                        })
                      }
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="price" className="text-right">
                      Giá
                    </Label>
                    <Input
                      id="price"
                      type="number"
                      value={newEquipment.price}
                      onChange={(e) =>
                        setNewEquipment({
                          ...newEquipment,
                          price: Number(e.target.value),
                        })
                      }
                      className="col-span-3"
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button onClick={saveEquipment}>
                    {isEditing ? t("update") : t("add")}
                  </Button>
                  <Button variant="secondary" onClick={resetDialog}>
                    {t("cancel")}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
          <div className="flex gap-5 flex-wrap">
            {equipments.map((equipment) => (
              <div
                key={equipment.id}
                className={`p-5 rounded-lg shadow-md text-left min-w-[250px] ${
                  theme === "dark"
                    ? "bg-gray-800 text-white"
                    : "bg-white text-black"
                }`}
              >
                <h3 className="text-lg font-semibold mb-2">{equipment.name}</h3>
                <p className="text-base mb-1">{equipment.type}</p>
                <p className="text-base">Giá: {equipment.price}₫</p>
                <div className="flex justify-between items-center mt-3">
                  <Button
                    variant="outline"
                    onClick={() => openEditDialog(equipment)}
                  >
                    {t("update")}
                  </Button>
                  <Button
                    variant="destructive"
                    onClick={() => deleteEquipmentAPI(equipment.id)}
                  >
                    {t("delete")}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
