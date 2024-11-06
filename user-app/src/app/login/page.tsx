"use client"
import axios from "axios"
import React from "react"
import { useState } from "react"
import { NEXT_PUBLIC_API_URL } from "../env"
export default function SignIn() {
  const url = `${NEXT_PUBLIC_API_URL}/Login`

  const [UserName, setUserName] = useState("")
  const [Password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [successMessage, setSuccessMessage] = useState("")

  async function Submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const data = JSON.stringify({ UserName, Password })

    try {
      const response = await axios.post(url, data)
      const token = response.data.token
      localStorage.setItem("Token", token)
      setSuccessMessage("Đăng nhập thành công!")
      setError("")
      console.log("Successfully!", token)
    } catch (error) {
      console.log("Failed", error)
      setError(
        "Đăng nhập thất bại. Vui lòng kiểm tra tên người dùng và mật khẩu."
      )

      setSuccessMessage("")
    }
  }
  return (
    <div className="w-full h-auto py-5 flex justify-center items-center">
      <div className="w-1/2 bg-white p-5 border border-brown-500 rounded">
        <div className="text-3xl text-black text-center mb-5">Log In</div>
        {successMessage && (
          <p className="text-green-500 text-center">{successMessage}</p>
        )}
        {error && <p className="text-red-500 text-center">{error}</p>}
        <div>
          <form onSubmit={Submit}>
            <label>User Name:</label>
            <br />
            <input
              type="text"
              placeholder="Enter user name"
              value={UserName}
              onChange={(e) => setUserName(e.target.value)}
              className="w-full p-2 border border-brown-500 rounded"
            />
            <br />
            <label>Password:</label>
            <br />
            <input
              type="password"
              placeholder="Enter password"
              value={Password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border border-brown-500 rounded"
            />
            <br />
            <button
              type="submit"
              className="w-full bg-brown-500 mt-5 p-2 rounded text-white text-center hover:opacity-50"
            >
              Log In
            </button>
          </form>
          <p className="text-center my-1">or</p>
          <button className="w-full bg-white p-2 border border-brown-500 rounded text-black text-center hover:opacity-50">
            Google
          </button>
          <p className="text-center my-1">
            Don't have an account?
            <a href="/signup" className="text-brown-500">
              Sign Up
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}
