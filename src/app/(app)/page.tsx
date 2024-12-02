'use client'
import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'


const page = () => {

  const [name , setName] = useState("mujeeb")
  const runTime =()=>{
        setName("Zeeshan")
  }

  const router = useRouter()
  return (
    <div>
      <h1>Hello this {name}, He is a Web Developer</h1>
      <button onClick={()=>runTime()  }>click me</button>
      <br />
      <Link href="/sign-in">Go to signIn</Link>
      <br />
      <button onClick={()=> router.push('/sign-in')}>Go to login</button>
    </div>
  )
}

export default page
