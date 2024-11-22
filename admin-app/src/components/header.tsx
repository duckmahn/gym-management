'use client';

import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogFooter, DialogTitle } from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import Cookies from "js-cookie";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import axios from "axios";

interface FormData {
  title: string;
  content: string;
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


      const avatarUrl = "http://api.nosteable.works/uploads/d5035bf9-6911-4868-8b2d-011dac827f10.PNG";
      setAvatar(avatarUrl);
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
          <Avatar>
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
