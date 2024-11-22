"use client";
import React, { useState, useEffect } from "react";
import Sidebar from "@/app/[locale]/components/sidebar";
import Header from "@/app/[locale]/components/header";
import { useTheme } from "next-themes";
import { useTranslations } from "next-intl";
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
import Cookies from "js-cookie";

interface Membership {
  id: number;
  type: string;
  price: number;
  description: string;
  startDate: string;
  endDate: string;
}

export default function MembershipPage(): JSX.Element {
  const t = useTranslations("MembershipPage");
  const [memberships, setMemberships] = useState<Membership[]>([]);
  const [newMembership, setNewMembership] = useState<Membership>({
    id: 0,
    type: "",
    price: 0,
    description: "",
    startDate: "",
    endDate: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
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
      resetDialog();
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
      resetDialog();
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

  const openEditDialog = (membership: Membership) => {
    setIsEditing(true);
    setEditingId(membership.id);
    setNewMembership(membership);
  };

  const resetDialog = () => {
    setNewMembership({
      id: 0,
      type: "",
      price: 0,
      description: "",
      startDate: "",
      endDate: "",
    });
    setIsEditing(false);
    setEditingId(null);
  };

  if (!isThemeLoaded) {
    return null;
  }

  return (
    <div
      className={`flex h-screen ${
        theme === "dark" ? "bg-gray-900 text-white" : "bg-gray-100 text-black"
      }`}
    >
      <Sidebar active="membership" />
      <main className="flex-grow p-5 ml-64">
        <Header />
        <div
          className={`p-5 rounded-lg shadow-md ${
            theme === "dark" ? "bg-gray-800" : "bg-white"
          }`}
        >
          <div className="flex justify-between items-center mb-5">
            <h2 className="text-2xl font-semibold">{t("listofmembership")}</h2>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" onClick={() => resetDialog()}>
                  {t("addmembership")}
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>
                    {isEditing ? t("updatemembership") : t("addnewmembership")}
                  </DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="type" className="text-right">
                      {t("type")}
                    </Label>
                    <Input
                      id="type"
                      value={newMembership.type}
                      onChange={(e) =>
                        setNewMembership({
                          ...newMembership,
                          type: e.target.value,
                        })
                      }
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="price" className="text-right">
                      {t("price")}
                    </Label>
                    <Input
                      id="price"
                      type="number"
                      value={newMembership.price}
                      onChange={(e) =>
                        setNewMembership({
                          ...newMembership,
                          price: Number(e.target.value),
                        })
                      }
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="description" className="text-right">
                      {t("description")}
                    </Label>
                    <Input
                      id="description"
                      value={newMembership.description}
                      onChange={(e) =>
                        setNewMembership({
                          ...newMembership,
                          description: e.target.value,
                        })
                      }
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="startDate" className="text-right">
                      {t("startdate")}
                    </Label>
                    <Input
                      id="startDate"
                      type="date"
                      value={newMembership.startDate}
                      onChange={(e) =>
                        setNewMembership({
                          ...newMembership,
                          startDate: e.target.value,
                        })
                      }
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="endDate" className="text-right">
                      {t("enddate")}
                    </Label>
                    <Input
                      id="endDate"
                      type="date"
                      value={newMembership.endDate}
                      onChange={(e) =>
                        setNewMembership({
                          ...newMembership,
                          endDate: e.target.value,
                        })
                      }
                      className="col-span-3"
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button onClick={handleSaveMembership}>
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
            {memberships.map((membership) => (
              <div
                key={membership.id}
                className={`p-5 rounded-lg shadow-md text-left min-w-[250px] ${
                  theme === "dark"
                    ? "bg-gray-800 text-white"
                    : "bg-white text-black"
                }`}
              >
                <h3 className="text-lg font-semibold mb-2">
                  {membership.type}
                </h3>
                <p className="text-base mb-1">{membership.description}</p>
                <p className="text-base">Giá: {membership.price}₫</p>
                <p className="text-base">
                  {t("startdate")}: {membership.startDate}
                </p>
                <p className="text-base">
                  {t("enddate")}: {membership.endDate}
                </p>
                <div className="flex justify-between items-center mt-3">
                  <Button
                    variant="outline"
                    onClick={() => openEditDialog(membership)}
                  >
                    {t("edit")}
                  </Button>
                  <Button
                    variant="destructive"
                    onClick={() => deleteMembershipAPI(membership.id)}
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
