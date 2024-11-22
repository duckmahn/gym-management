"use client";
import axios from "axios";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";

export default function CoursePage() {
  interface Course {
    id: string;
    name: string;
    description: string;
    startDate: string;
    endDate: string;
    price: number;
  }
  const [courses, setCourses] = useState<Course[]>([]);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const urlCourse = `https://api.nosteable.works/api/Course`;

  useEffect(() => {
    const readCourse = async () => {
      const response = await axios.get(urlCourse);
      try {
        setCourses(response.data);
        setSuccess("OK");
      } catch (error) {
        if (response.status === 401) {
          setError("Unauthorized");
        } else if (response.status === 403) {
          setError("Forbidden");
        }
      }
    };
    readCourse();
  }, []);

  return (
    <div className="w-full h-full flex flex-row">
      <div className="w-[5%] bg-white pt-[100px]">
        <ul className="flex flex-col items-center">
          <li className="pb-[20px]">
            <a href="/dashboard">
              <img src="/images/icon1.png" />
            </a>
          </li>
          <li className="pb-[20px] hover:opacity-[0.5]">
            <a href="#">
              <img src="/images/icon2.png" />
            </a>
          </li>
          <li className="pb-[20px] hover:opacity-[0.5]">
            <a href="/dashboard/courses">
              <img src="/images/icon3.png" />
            </a>
          </li>
          <li className="pb-[20px] hover:opacity-[0.5]">
            <a href="#">
              <img src="/images/icon4.png" />
            </a>
          </li>
          <li className="pb-[20px] hover:opacity-[0.5]">
            <a href="/dashboard/settings">
              <img src="/images/icon5.png" />
            </a>
          </li>
        </ul>
      </div>
      <div className="w-[95%] bg-grey p-[20px]">
        <div className="w-full mb-[10px] flex flex-row">
          <div className="float-left font-[900] text-[30px] text-white">
            Welcome, user
          </div>
        </div>
        <div className="w-full mt-[10px] rounded-[15px]">
          <div className="w-full h-[100px] bg-brown"></div>
          <div className="w-full bg-white p-[10px]">
            <div className="mb-[10px] font-[700] text-[20px] text-black">
              Cac khoa hoc
            </div>
            <div className="w-full mt-[10px] flex flex-wrap">
              {courses.map((course) => (
                <div
                  key={course.id}
                  className="w-[300px] h-[200px] bg-grey mr-[20px] mb-[20px] rounded-[10px] p-[10px]"
                >
                  <div className="w-full mb-[5px]">
                    <p className="font-[700] text-center text-[20px] text-black">
                      {course.name}
                    </p>
                  </div>
                  <hr />
                  <div className="w-full mt-[5px] mb-[5px] flex flex-row">
                    <div className="float-left w-[50%]">
                      <div>
                        <div className="font-[700] text-[20px] text-black">
                          3 Thang
                        </div>
                        <div className="text-white">Thoi gian</div>
                      </div>
                      <div>
                        <div className="font-[700] text-[20px] text-black">
                          {course.price}đ
                        </div>
                        <div className="text-white">Chi phi</div>
                      </div>
                    </div>
                    <div className="float-right w-[50%]">
                      <img
                        src="/images/default.png"
                        className="w-[75px] h-[75px]"
                      />
                    </div>
                  </div>
                  <div className="w-full">
                    <button className="float-right w-[75px] h-[25px] bg-brown mt-[5px] rounded-[5px] text-white hover:opacity-[0.5] flex flex-row justify-center">
                      <p>Chi tiet</p>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
