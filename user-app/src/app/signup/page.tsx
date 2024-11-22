"use client";
import axios from "axios";
import React, { useState } from "react";
import { NEXT_PUBLIC_API_URL } from "../env";

export interface SignUp {
  email: string;
  username: string;
  firstname: string;
  lastname: string;
  phone: string;
  password: string;
  isAdmin: boolean;
}

export default function SignUpComponent() {
  const url = `${NEXT_PUBLIC_API_URL}Register`;
  const [data, setData] = useState<SignUp>({
    email: "",
    username: "",
    firstname: "",
    lastname: "",
    phone: "",
    password: "",
    isAdmin: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  async function Submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      const response = await axios.post(url, data);
      if (response.status === 200) {
        console.log("Successfully", response.data);
      }
    } catch (error) {
      console.error("Failed", error);
    }
  }

  return (
    <div className="w-full h-auto  py-5 flex justify-center items-center">
      <div className="w-1/2 bg-white p-5 border border-brown rounded">
        <div className="text-3xl text-black text-center mb-5">Sign Up</div>
        <div className="Content">
          <form onSubmit={Submit}>
            <label>User Name:</label>
            <br />
            <input
              type="text"
              name="username"
              placeholder="Enter User Name"
              value={data.username}
              onChange={handleChange}
              className="w-full p-2 border border-brown rounded"
              required
            />
            <br />
            <label>Email:</label>
            <br />
            <input
              type="email"
              name="email"
              placeholder="Enter Email"
              value={data.email}
              onChange={handleChange}
              className="w-full p-2 border border-brown rounded"
              required
            />
            <br />
            <label>First Name:</label>
            <br />
            <input
              type="text"
              name="firstname"
              placeholder="Enter First Name"
              value={data.firstname}
              onChange={handleChange}
              className="w-full p-2 border border-brown rounded"
              required
            />
            <br />
            <label>Last Name:</label>
            <br />
            <input
              type="text"
              name="lastname"
              placeholder="Enter Last Name"
              value={data.lastname}
              onChange={handleChange}
              className="w-full p-2 border border-brown rounded"
              required
            />
            <br />
            <label>Phone:</label>
            <br />
            <input
              type="text"
              name="phone"
              placeholder="Enter Phone Number"
              value={data.phone}
              onChange={handleChange}
              className="w-full p-2 border border-brown rounded"
              required
            />
            <br />
            <label>Password:</label>
            <br />
            <input
              type="password"
              name="password"
              placeholder="Enter Password"
              value={data.password}
              onChange={handleChange}
              className="w-full p-2 border border-brown rounded"
              required
            />
            <br />
            <button
              type="submit"
              className="w-full bg-brown mt-5 p-2 rounded text-white text-center hover:opacity-50"
            >
              Sign Up
            </button>
          </form>
          <p className="text-center my-1">or</p>
          <button className="w-full bg-white p-2 border border-brown rounded text-black text-center hover:opacity-50">
            Google
          </button>
          <p className="text-center my-1">
            Already have an account?
            <a href="/login" className="text-brown">
              Log In
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
