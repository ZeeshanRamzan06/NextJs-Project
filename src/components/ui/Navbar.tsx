"use client"
import { useSession, signOut } from 'next-auth/react'
import React from 'react'
import { User } from 'next-auth'
import { Button } from "@/components/ui/button"
import Link from 'next/link'

const Navbar = () => {
  const { data: session } = useSession()
  const user: User = session?.user

  return (
    <nav className="bg-gray-800 text-white py-4 px-8 flex justify-between items-center shadow-lg">
      <div className="text-2xl font-bold tracking-wide">
        <a href="#" className="hover:text-yellow-400 transition duration-200">
          Mystery Message
        </a>
      </div>
      <div className="flex items-center space-x-6">
        {session ? (
          <>
            <span className="text-sm sm:text-base font-medium">
              Welcome, <span className="text-yellow-400">{user?.username || user?.email}</span>
            </span>
            <Button
              onClick={() => signOut()}
              className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg shadow-md transition duration-200"
            >
              Logout
            </Button>
          </>
        ) : (
          <Link href="/sign-in">
            <Button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg shadow-md transition duration-200">
              Login
            </Button>
          </Link>
        )}
      </div>
    </nav>
  )
}

export default Navbar
