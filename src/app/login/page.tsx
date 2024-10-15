"use client"

import axios from "axios"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function page() {
  const router = useRouter()
  const [user, setUser] = useState({ email: "", password: "" })
  const onLogin = async () => {
    try {
      const response = await axios.post("/api/users/login", user)
      console.log("login success", response.data)
      router.push("/profile")
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen py-2 border border-green-500">
        <hr />
        <label htmlFor="email">email</label>
        <input
          className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
          id="email"
          type="text"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
          placeholder="email"
        />
        <label htmlFor="password">password</label>
        <input
          className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
          id="password"
          type="password"
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
          placeholder="password"
        />
        <button
          onClick={onLogin}
          className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
        >
          Login
        </button>
        <Link href="/signup">Visit signup page</Link>
      </div>
    </>
  )
}
