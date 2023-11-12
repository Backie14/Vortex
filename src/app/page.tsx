'use client'
// import Image from 'next/image'

import { useState } from "react"

export default function Home() {
  const [data,setData] = useState(true);
  const name = "Backie"
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      
    <div className="bg-cyan-400 rounded text-black p-4 hover:bg-green-600 animate-bounce hover:text-lg">{name}</div>
     
    </main>
  )
}
