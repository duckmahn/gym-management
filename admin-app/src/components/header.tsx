"use client";



import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogFooter, DialogTitle } from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import axios from "axios";
import { Textarea } from "./ui/textarea";
import { useRouter } from "next/navigation";

interface FormData {
  title: string;
  content: string;
}

export default function Header(): JSX.Element {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [formData, setFormData] = useState<FormData>({
    title: "",
    content: "",
  });
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const storedUsername = localStorage.getItem('username');
    if (token && storedUsername) {
      setIsLoggedIn(true);
      setUsername(storedUsername);
    } else {
      setIsLoggedIn(false);
      setUsername('');
    }
  }, [router]);

  const sendNotification = async (e) => {
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
    <header className="flex justify-between items-center mb-5 relative">
      <div className="flex items-center gap-4 relative">
        <div
          className="text-2xl cursor-pointer hover:scale-125"
          onClick={() => setIsOpen(true)}
        >
          <i className="fas fa-bell text-[#c21f37]" />
        </div>
        <div className="flex">
          <input
            className="w-[400px] p-2.5 rounded-full border border-gray-300 pl-10 bg-no-repeat bg-center"
            type="text"
            placeholder="Search here"
          />
        </div>
        {isLoggedIn && (
          <div className="absolute right-5 flex items-center space-x-2">
            <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
              <span className="text-white font-bold">{username[0]}</span>
            </div>
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
      </div>

    </header>
  );
}
