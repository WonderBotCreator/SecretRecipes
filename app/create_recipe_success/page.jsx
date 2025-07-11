'use client'

import { useState } from "react";
import { useRouter } from "@node_modules/next/navigation"
import Link from "@node_modules/next/link";

const CreateRecipeSuccessPage = () => {
    const router = useRouter()
    const [currentTime, setCurrentTime] = useState(5)

    setTimeout(() => {
        if(currentTime == 1){
            router.replace('/')
        }

        //console.log("Delayed for 1 second.");
        setCurrentTime(currentTime-1)
    }, "1000");


    return (
        <div className="flex items-center justify-center m-10 h-screen bg-[#ffffff]">
      <div>
        <div className="flex flex-col items-center space-y-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="text-green-600 w-28 h-28" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h1 className="text-4xl font-bold">Uploading recipe successfully</h1>
          <p>back to home page in {currentTime}</p>
          <Link href="/"
            className="inline-flex items-center px-4 py-2 text-white bg-orange-600 border border-orange-600 rounded rounded-full hover:bg-indigo-700 focus:outline-none focus:ring">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3 mr-2" fill="none" viewBox="0 0 24 24"
              stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M7 16l-4-4m0 0l4-4m-4 4h18" />
            </svg>
            <span className="text-sm font-medium">
              Home
            </span>
          </Link>
        </div>
      </div>
    </div>
    )
}

export default CreateRecipeSuccessPage