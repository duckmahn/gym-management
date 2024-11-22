"use client";
import React from "react";

export default function LandingPage() {
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
            <div className="w-full mb-[10px] flex flex-row">
              <div className="float-left">
                <p className="font-[700] text-[20px] text-black">User</p>
                <p className="text-grey">user111@gmail.com</p>
              </div>
              <div></div>
            </div>
            <div className="w-full mt-[10px] flex flex-row">
              <div className="w-[50%] mr-[5px]">
                <label>Ho va ten</label>
                <br />
                <input className="w-full bg-gray rounded-[5px] p-[5px]" />
                <label>Gioi tinh</label>
                <br />
                <input className="w-full bg-gray rounded-[5px] p-[5px]" />
                <label>Email</label>
                <br />
                <input className="w-full bg-gray rounded-[5px] p-[5px]" />
                <label>BMI</label>
                <br />
                <input className="w-full bg-gray rounded-[5px] p-[5px]" />
              </div>
              <div className="w-[50%] ml-[5px]">
                <label>SĐT</label>
                <br />
                <input className="w-full bg-gray rounded-[5px] p-[5px]" />
                <label>Ngay thang nam sinh</label>
                <br />
                <input className="w-full bg-gray rounded-[5px] p-[5px]" />
                <label>Quoc gia</label>
                <br />
                <input className="w-full bg-gray rounded-[5px] p-[5px]" />
                <label>Thoi han</label>
                <br />
                <input className="w-full bg-gray rounded-[5px] p-[5px]" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
