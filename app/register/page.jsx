'use client'

import Loading from "@components/Loading"
import { redirect, useRouter } from "@node_modules/next/navigation"
import { useState } from "react"

const RegisterPage = () => {
    const router = useRouter()
    const [notification, setNotification] = useState('')
    const [email, setEmail] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const [loading, setLoading] = useState(false)

    const [imageFile, setImageFile] = useState({ cdnUrl: process.env.NEXT_PUBLIC_DEFAULT_USER_IMG, uuid: '' })

    const handleEmail = (event) => {
        setEmail(event.target.value)
    }

    const handleUsername = (event) => {
        setUsername(event.target.value)
    }

    const handlePassword = (event) => {
        setPassword(event.target.value)
    }

    const handleConfirmPassword = (event) => {
        setConfirmPassword(event.target.value)
    }


    const handleRegister = async (event) => {
        event.preventDefault()

        if (username === '') {
            setNotification('username is empty')
            return
        }

        if (password !== confirmPassword) {
            setNotification('Password doesnt match')
            return
        }
        else {
            setNotification('')
            setLoading(true)
        }

        const newUser = {
            username: username,
            email: email,
            password: password
        }

        const response = await fetch('/api/auth/register', {
            method: 'POST',
            body: JSON.stringify({
                email: email,
                username: username,
                password: password,
                image: imageFile.cdnUrl,
                imageID: imageFile.uuid
            }),
        })

        const data = await response.json()


        if(!data?.success)
        {
            setLoading(false)
            setNotification(data?.message)
            return
        }
        console.log(data)

        router.push('/register_success')

    }

    if(loading)
    {
        return(

            <Loading/>
        )
    }


    return (
        <div className="flex flex-col justify-center items-center w-full bg-[#e3b986] px-2">





            <div
                className={`xl:max-w-3xl bg-white w-full p-5 sm:p-10 rounded-md my-5`}
            >
                <h1
                    className={`text-center text-xl sm:text-3xl font-semibold bg-white text-black`}
                >
                    Register
                </h1>

                 {notification != '' ?
                <div role="alert" className="alert alert-error mt-10">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>{notification}</span>
                </div>
                : <></>
            }
                <div className="w-full mt-8 bg-white">
                    <div className="mx-auto max-w-xs sm:max-w-md md:max-w-lg flex flex-col gap-4">

                        <form onSubmit={handleRegister}>

                            <fieldset className="fieldset w-full">
                                <legend className="fieldset-legend">Username</legend>
                                <input onChange={handleUsername} value={username} type="text" className="input validator w-full" required placeholder="Username"
                                    pattern="[A-Za-z][A-Za-z0-9\-]*" minLength="3" maxLength="30" title="Only letters, numbers or dash" />
                                <p className="hidden validator-hint">
                                    Must be 3 to 30 characters
                                    <br />containing only letters, numbers or dash
                                </p>
                            </fieldset>


                            <fieldset className="fieldset w-full">
                                <legend className="fieldset-legend">Email</legend>
                                <input onChange={handleEmail} value={email} className="input validator w-full" type="email" required placeholder="mail@site.com" />
                                <div className="hidden validator-hint">Enter valid email address</div>
                            </fieldset>


                            <fieldset className="fieldset w-full">
                                <legend className="fieldset-legend">Password</legend>
                                <input  onChange={handlePassword} value={password} type="password" className="input validator w-full" required placeholder="Password" minLength="8"
                                    pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                                    title="Must be more than 8 characters, including number, lowercase letter, uppercase letter" />
                                <p className="hidden validator-hint">
                                    Must be more than 8 characters, including
                                    <br />At least one number
                                    <br />At least one lowercase letter
                                    <br />At least one uppercase letter
                                </p>
                               
                            </fieldset>

                             <fieldset className="fieldset w-full">
                                <legend className="fieldset-legend">Confirm password</legend>
                                <input  onChange={handleConfirmPassword} value={confirmPassword} type="password" className="input validator w-full" required placeholder="Password" minLength="8"
                                    pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                                    title="Must be more than 8 characters, including number, lowercase letter, uppercase letter" />
                                <p className="hidden validator-hint">
                                    Must be more than 8 characters, including
                                    <br />At least one number
                                    <br />At least one lowercase letter
                                    <br />At least one uppercase letter
                                </p>
                               
                            </fieldset>


                            <button type="submit" className="mt-5 tracking-wide font-semibold bg-[#E9522C] text-gray-100 w-full py-4 rounded-lg hover:bg-[#E9522C]/90 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none">

                                <span className="ml-3">Create Account</span>
                            </button>

                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RegisterPage
