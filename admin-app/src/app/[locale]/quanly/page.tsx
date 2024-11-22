"use client";

import React, { useState, useEffect } from "react";

import { useSchedule } from "@/hooks/useSchedule";
import Sidebar from "../components/sidebar";
import Header from "../components/header";
import { Calendar } from "../components/ui/calendar";
import Cookies from "js-cookie";
import { Button } from "../components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogFooter,
} from "../components/ui/dialog";
import { Label } from "../components/ui/label";
import { Input } from "../components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import axios from "axios";
import { NEXT_PUBLIC_API_URL } from "../../../../apiconfig";

interface Room {
  id: string;
  name: string;
  description: string;
  maxParticipants: number;
  roomType: string;
}

interface Trainer {
  id: string;
  name: string;
  email: string;
  phone: number;
  specialty: string;
  experience: string;
  avatar: string;
  type: string;
}

interface ScheduleForm {
  date: Date;
  startTime: string;
  endTime: string;
  location: string;
  roomId: string;
  trainerId: string;
}

export default function ManagementPage(): JSX.Element {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [token, setToken] = useState<string | null>(null);
  const [searchDate, setSearchDate] = useState<Date | undefined>(new Date());
  const { schedule, getSchedule } = useSchedule(token);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [rooms, setRooms] = useState<Room[]>([]);
  const [trainers, setTrainers] = useState<Trainer[]>([]);
  const [scheduleForm, setScheduleForm] = useState<ScheduleForm>({
    date: new Date(),
    startTime: "",
    endTime: "",
    location: "",
    roomId: "",
    trainerId: "",
  });

  const handleDayClick = async (date: Date) => {
    const dateData = date;
    setSearchDate(new Date(dateData.setDate(dateData.getDate())));
    await getSchedule(dateData);
  };

  useEffect(() => {
    setToken(Cookies.get("token"));
  }, []);

  useEffect(() => {
    if (searchDate) {
      getSchedule(new Date(searchDate));
    }
  }, [searchDate, getSchedule]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token =
          "eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTI1NiIsInR5cCI6IkpXVCJ9.eyJJZCI6ImQ1MDM1YmY5LTY5MTEtNDg2OC04YjJkLTAxMWRhYzgyN2YxMCIsIkVtYWlsIjoiYWRtaW5AZ3ltLmNvbSIsIlVzZXJuYW1lIjoiQWRtaW4gVXNlciIsImV4cCI6MjA0NzgyMzQ3NH0.lmFxgmOy0vvKUDzM19jIb2hPmlrJGcccFKGcxzMZbCk";
        const [roomsResponse, trainersResponse] = await Promise.all([
          axios.get(`${NEXT_PUBLIC_API_URL}/api/Rooms`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }),
          axios.get(`${NEXT_PUBLIC_API_URL}/api/Trainers`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }),
        ]);
        setRooms(roomsResponse.data);
        setTrainers(trainersResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleScheduleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const scheduleData = {
        date: new Date(scheduleForm.date),
        startTime: new Date(
          scheduleForm.date.toDateString() + " " + scheduleForm.startTime
        ),
        endTime: new Date(
          scheduleForm.date.toDateString() + " " + scheduleForm.endTime
        ),
        location: scheduleForm.location,
      };

      await axios.post(
        `https://api.nosteable.works/api/Schedule?roomId=${scheduleForm.roomId}&trainerId=${scheduleForm.trainerId}`,
        scheduleData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setIsDialogOpen(false);
      // Refresh schedule
      if (searchDate) {
        getSchedule(searchDate);
      }
    } catch (error) {
      console.error("Error creating schedule:", error);
    }
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar active="quan-ly" onToggle={setIsSidebarOpen} />
      <main
        className={`flex-1 p-6 bg-gray-50 transition-all duration-300 ${
          isSidebarOpen ? "ml-[250px]" : "ml-0"
        }`}
      >
        <Header />

        <div className="flex space-x-6 mt-6">
          <div className="flex-1 bg-white shadow-lg rounded-lg p-6">
            <div className="flex justify-between">
              <h2 className="text-2xl font-semibold mb-4">Thông báo</h2>
              <div className="">
                <Button onClick={() => setIsDialogOpen(true)}>
                  Đăng ký lịch dạy
                </Button>
              </div>
            </div>
            <table className="w-full text-left text-gray-700">
              <thead>
                <tr>
                  <th className="px-4 py-2">Ngày</th>
                  <th className="px-4 py-2">Trainer</th>
                  <th className="px-4 py-2">Location</th>
                  <th className="px-4 py-2">Room</th>
                  <th className="px-4 py-2">Giờ bắt đầu</th>
                  <th className="px-4 py-2">Giờ kết thúc</th>
                </tr>
              </thead>
              <tbody>
                {schedule &&
                  schedule?.map((item, index) => (
                    <tr key={index}>
                      <td className="px-4 py-2">
                        {new Date(item.date).toLocaleDateString("vi-VN", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </td>
                      <td className="px-4 py-2">
                        {
                          trainers.find(
                            (trainer) => trainer.id === item.trainerId
                          )?.name
                        }
                      </td>
                      <td className="px-4 py-2">{item.location}</td>
                      <td className="px-4 py-2">
                        {rooms.find((room) => room.id === item.roomId)?.name}
                      </td>
                      <td className="px-4 py-2">
                        {new Date(item.startTime).toLocaleTimeString("vi-VN", {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </td>
                      <td className="px-4 py-2">
                        {new Date(item.endTime).toLocaleTimeString("vi-VN", {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>

          <div className="w-72 bg-white shadow-lg rounded-lg p-6">
            <Calendar
              mode="single"
              selected={searchDate}
              onSelect={(date) => handleDayClick(date || new Date())}
              className="rounded-md border"
            />
          </div>
        </div>
        <div className="flex items-end"></div>
      </main>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogTitle>Đăng ký lịch dạy</DialogTitle>
          <form onSubmit={handleScheduleSubmit}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="date">Ngày</Label>
                <Input
                  id="date"
                  type="date"
                  className="col-span-3"
                  value={scheduleForm.date.toISOString().split("T")[0]}
                  onChange={(e) =>
                    setScheduleForm({
                      ...scheduleForm,
                      date: new Date(e.target.value),
                    })
                  }
                />
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="startTime">Giờ bắt đầu</Label>
                <Input
                  id="startTime"
                  type="time"
                  className="col-span-3"
                  value={scheduleForm.startTime}
                  onChange={(e) =>
                    setScheduleForm({
                      ...scheduleForm,
                      startTime: e.target.value,
                    })
                  }
                />
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="endTime">Giờ kết thúc</Label>
                <Input
                  id="endTime"
                  type="time"
                  className="col-span-3"
                  value={scheduleForm.endTime}
                  onChange={(e) =>
                    setScheduleForm({
                      ...scheduleForm,
                      endTime: e.target.value,
                    })
                  }
                />
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="location">Địa điểm</Label>
                <Input
                  id="location"
                  className="col-span-3"
                  value={scheduleForm.location}
                  onChange={(e) =>
                    setScheduleForm({
                      ...scheduleForm,
                      location: e.target.value,
                    })
                  }
                />
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="room">Phòng</Label>
                <Select
                  value={scheduleForm.roomId}
                  onValueChange={(value) =>
                    setScheduleForm({
                      ...scheduleForm,
                      roomId: value,
                    })
                  }
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Chọn phòng" />
                  </SelectTrigger>
                  <SelectContent>
                    {rooms.map((room) => (
                      <SelectItem key={room.id} value={room.id}>
                        {room.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="trainer">Huấn luyện viên</Label>
                <Select
                  value={scheduleForm.trainerId}
                  onValueChange={(value) =>
                    setScheduleForm({
                      ...scheduleForm,
                      trainerId: value,
                    })
                  }
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Chọn huấn luyện viên" />
                  </SelectTrigger>
                  <SelectContent>
                    {trainers.map((trainer) => (
                      <SelectItem key={trainer.id} value={trainer.id}>
                        {trainer.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Lưu</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
