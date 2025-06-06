'use client'

import { signIn } from "@node_modules/next-auth/react";
import Link from "@node_modules/next/link";
import { redirect, useRouter } from "@node_modules/next/navigation";
import { useState } from "react";
import Loading from "./Loading";

const LoginForm = () => {

    const router = useRouter()
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [notification, setNotification] = useState('')

    const [loading, setLoading] = useState(false)


    const handleUsername = (event) => {
        setUsername(event.target.value)
    }

    const handlePassword = (event) => {
        setPassword(event.target.value)
    }

    const submitLogin = async (event) => {
        event.preventDefault()
        setLoading(true)
        try {

            const response = await signIn("credentials", {
                username,
                password,
                redirect: false,
            })

            if (!response?.ok) {
                setLoading(false)
                //console.log(response)
                setNotification('Username or password is invalid')
                return
            }

            // if(!response.ok){
            //      setNotification('Username or password is invalid')
            //     return
            // }

            router.replace('/')
            //router.refresh()

        } catch (error) {
            console.log(error)
        }

    }

    if(loading){
        return(
            <Loading/>
        )
    }

    return (
        <div>


            <div className="flex flex-row place-content-center gap-4 mx-8 mt-8">
                <div className="basic-64"></div>
                <div className="basic-128 w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow-sm sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
                    <form onSubmit={submitLogin} className="space-y-6" action="#">
                        <h5 className="text-xl font-medium text-gray-900 dark:text-white">Sign in</h5>

                         {notification != '' ?
                <div role="alert" className="alert alert-error mt-10">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>{notification}</span>
                </div>
                : <></>
            }


                        <div>
                            <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Username</label>
                            <input value={username} onChange={handleUsername} type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="username" required />
                        </div>
                        <div>
                            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
                            <input value={password} onChange={handlePassword} type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required />
                        </div>

                        <button type="submit" className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Login to your account</button>
                        <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
                            Not registered? <Link href="/register" className="text-blue-700 hover:underline dark:text-blue-500">Create account</Link>
                        </div>
                    </form>
                </div>
                <div className="basic-64"></div>

            </div>




        </div>
    )
}

export default LoginForm