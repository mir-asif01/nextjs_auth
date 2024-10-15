"use client"

import axios from "axios"
import Link from "next/link"

import { useEffect, useState } from "react"

export default function page() {
  const [token, setToken] = useState("")
  const [verified, setVerified] = useState(false)

  const verifyEmail = async () => {
    try {
      axios.post("api/users/verifyemail", { token })
      setVerified(true)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    const urlToken = window.location.search.split("=")[1]
    setToken(urlToken || "")
  }, [])

  useEffect(() => {
    if (token.length > 0) {
      verifyEmail()
    }
  }, [token])

  return (
    <>
      <div className="min-h-screen flex justify-center items-center">
        <div className="text-center">
          {verified ? (
            <>
              <h1>Verify Email page</h1>
              <h1>{verified ? "Email verified" : ""}</h1>
              <Link href={"/login"}>Login</Link>
            </>
          ) : (
            <>
              <h1>Invalid token</h1>
            </>
          )}
        </div>
      </div>
    </>
  )
}
