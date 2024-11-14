"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogFooter, DialogHeader } from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import axios from "axios";
import { NEXT_PUBLIC_API_URL } from "../../apiconfig";
import { Textarea } from "./ui/textarea";

interface FormData {
  title?: string | undefined;
  content?: string | undefined;
}

export default function Header(): JSX.Element {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState<FormData>();

  const sendNotification = (e) => {
    e.preventDefault();
    if (e.target.title.value && e.target.content.value) {
      setFormData({
        title: e.target.title.value,
        content: e.target.description.value,
      });
    }
    if (formData) sendNotiofication(formData);
    setIsOpen(false);
  };

  const sendNotiofication = async (request: FormData) => {
    const res = await axios.post(
      `${NEXT_PUBLIC_API_URL}/api/Notification/notification`,
      request
    );
    return res.statusText;
  };
  return (
    <header className="flex justify-between items-center mb-5 relative">
      <div className="flex items-center justify-center w-full relative">
        <div
          className="text-2xl mr-2.5 cursor-pointer hover:scale-125 "
          onClick={() => setIsOpen(true)}
        >
          <i className="fas fa-bell text-[#c21f37]" />
        </div>
        <div className="flex">
          <input
            className="w-[400px] p-2.5 rounded-full border border-gray-300 pl-10 bg-no-repeat bg-center "
            type="text"
            placeholder="Search here"
          />
        </div>

        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogContent>
            <DialogHeader className="font-bold">Send Notification</DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right font-bold">
                  Title
                </Label>
                <Input
                  id="title"
                  placeholder="Title"
                  className="col-span-3"
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="username" className="text-right font-bold">
                  Content
                </Label>
                <Textarea
                  id="content"
                  placeholder="Content"
                  className="col-span-3"
                  onChange={(e) =>
                    setFormData({ ...formData, content: e.target.value })
                  }
                />
              </div>
            </div>
            <DialogFooter>
              <Button
                className="bg-rose-800"
                type="submit"
                onClick={sendNotification}
              >
                Send Notification
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </header>
  );
}
