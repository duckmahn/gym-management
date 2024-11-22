"use client";

import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTitle,
} from "@/app/[locale]/components/ui/dialog";
import { Input } from "@/app/[locale]/components/ui/input";
import { Label } from "@/app/[locale]/components/ui/label";
import { Button } from "@/app/[locale]/components/ui/button";
import { Textarea } from "@/app/[locale]/components/ui/textarea";
import Cookies from "js-cookie";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/app/[locale]/components/ui/avatar";
import axios from "axios";

interface FormData {
  title: string;
  content: string;
}

interface UserData {
  avatar: string;
  username: string;
}

export default function Header(): JSX.Element {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [avatar, setAvatar] = useState<string | null>(null);
  const [formData, setFormData] = useState<FormData>({
    title: "",
    content: "",
  });

  useEffect(() => {
    const token = Cookies.get("token");
    const storedUsername = Cookies.get("username");

    if (token && storedUsername) {
      setIsLoggedIn(true);
      setUsername(storedUsername);

      const fetchUserData = async () => {
        try {
          const response = await axios.get<UserData>(
            "https://api.nosteable.works/api/Users/d5035bf9-6911-4868-8b2d-011dac827f10"
          );
          setAvatar(response.data.avatar);
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      };

      fetchUserData();
    }
  }, []);

  const sendNotification = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.title && formData.content) {
      await sendNotificationRequest(formData);
      setIsOpen(false);
    }
  };

  const sendNotificationRequest = async (request: FormData) => {
    const res = await axios.post(
      `https://api.nosteable.works/api/Notification`,
      request
    );
    return res.statusText;
  };

  const handleAvatarClick = () => {
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = "image/*";
    fileInput.onchange = async (e) => {
      const target = e.target as HTMLInputElement;
      if (target.files && target.files[0]) {
        const formData = new FormData();
        formData.append("file", target.files[0]);

        try {
          await axios.put(
            "https://api.nosteable.works/api/Users/Avatar/d5035bf9-6911-4868-8b2d-011dac827f10",
            formData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }
          );

          // Refresh avatar by fetching user data again
          const response = await axios.get<UserData>(
            "https://api.nosteable.works/api/Users/d5035bf9-6911-4868-8b2d-011dac827f10"
          );
          setAvatar(response.data.avatar);
        } catch (error) {
          console.error("Error uploading avatar:", error);
        }
      }
    };
    fileInput.click();
  };

  return (
    <header className="flex justify-center items-center mb-5 relative h-16 bg-white shadow-md">
      <div className="flex items-center space-x-4">
        <div
          className="text-2xl cursor-pointer hover:scale-125"
          onClick={() => setIsOpen(true)}
        >
          <i className="fas fa-bell text-[#c21f37]" />
        </div>
        <div className="relative">
          <input
            className="w-[400px] p-2.5 rounded-full border border-gray-300 pl-10 bg-no-repeat bg-center"
            type="text"
            placeholder="Search here"
          />
          <i className="fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>
      </div>

      {isLoggedIn && (
        <div className="absolute right-4 flex items-center space-x-2">
          <Avatar
            className="cursor-pointer hover:opacity-80"
            onClick={handleAvatarClick}
          >
            {avatar ? (
              <AvatarImage src={avatar} alt={`${username}'s avatar`} />
            ) : (
              <AvatarFallback>{username ? username[0] : "U"}</AvatarFallback>
            )}
          </Avatar>
          <span className="text-gray-700 font-semibold">{username}</span>
        </div>
      )}

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent>
          <DialogTitle className="font-bold">Send Notification</DialogTitle>
          <form onSubmit={sendNotification}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="title" className="text-right font-bold">
                  Title
                </Label>
                <Input
                  id="title"
                  placeholder="Title"
                  className="col-span-3"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="content" className="text-right font-bold">
                  Content
                </Label>
                <Textarea
                  id="content"
                  placeholder="Content"
                  className="col-span-3"
                  value={formData.content}
                  onChange={(e) =>
                    setFormData({ ...formData, content: e.target.value })
                  }
                />
              </div>
            </div>
            <DialogFooter>
              <Button className="bg-rose-800" type="submit">
                Send Notification
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </header>
  );
}
