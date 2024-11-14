"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogFooter, DialogTitle } from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import axios from "axios";
import { NEXT_PUBLIC_API_URL } from "../../apiconfig";
import { Textarea } from "./ui/textarea";

interface FormData {
  title: string | null;
  content: string | null;
}

export default function Header(): JSX.Element {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const sendNotification = () => {
    if (!!content && !!title) {
      sendNotiofication({ title, content });
      setTitle("");
      setContent("");
    }
    setIsOpen(false);
  };

  const sendNotiofication = (request: FormData) => {
    const res = axios.post(
      `${NEXT_PUBLIC_API_URL}/api/Notification/notification`,
      request
    );
    console.log("🚀 ~ sendNotiofication ~ res:", res);
    return res;
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
            <DialogTitle>Send Notification</DialogTitle>

            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right font-bold">
                  Title
                </Label>
                <Input
                  id="title"
                  placeholder="Title"
                  className="col-span-3"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
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
                  onChange={(e) => setContent(e.target.value)}
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
