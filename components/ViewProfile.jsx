'use client'

import Link from "@node_modules/next/link"
import { useState, useEffect } from "react"
import Loading from "./Loading"



const ViewProfile = ({ id }) => {

    const [loading, setLoading] = useState(true)
    const [user, setUser] = useState(null)
    const [recipes, setRecipes] = useState([])





    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await fetch(`/api/profile/${id}/1`)
                const data = await response.json()

                setUser(data.user)
                setRecipes(data.recipes)
                setLoading(false)

            } catch (error) {

            }

        }
        fetchUser()
    }, [])

    if (loading) {
        return (<Loading/>)
    }
    return (
        <div className="bg-[#e3b986]">
            <div className="container mx-auto py-8">
                <div className="grid grid-cols-4 sm:grid-cols-12 gap-6 px-4">

                    <div className="col-span-4 sm:col-span-9">

                        <div className="bg-white shadow rounded-lg p-6">
                            <div className="flex justify-center items-center">
                                <h2 className="text-xl font-bold mb-4"></h2>
                            </div>

                            <h2 className="text-xl font-bold mt-6 mb-4">Recipes</h2>
                            <ul className="grid grid-cols-1 xl:grid-cols-3 gap-y-10 gap-x-6 items-start p-8">
                                {recipes.map(recipe =>

                                    <li key={recipe.id} className="relative flex flex-col sm:flex-row xl:flex-col items-start">
                                        <div className="order-1 sm:ml-6 xl:ml-0">
                                            <h3 className="mb-1 text-slate-900 font-semibold">


                                                {recipe.recipeType === 'main dish' ?
                                                    <span className="mb-1 block text-sm leading-6 text-orange-700">Main Dish</span> :
                                                    recipe.recipeType === 'drink' ?
                                                        <span className="mb-1 block text-sm leading-6 text-sky-600">Drink</span> :
                                                        recipe.recipeType === 'dessert' ?
                                                            <span className="mb-1 block text-sm leading-6 text-indigo-600">Dessert</span> : <></>
                                                }
                                                {recipe.name}
                                            </h3>
                                            <div className="prose prose-slate prose-sm text-slate-600">
                                                <p className="line-clamp-[3]">{recipe.description}</p>
                                            </div><Link
                                                className="group inline-flex items-center h-9 rounded-full text-sm font-semibold whitespace-nowrap px-3 focus:outline-none focus:ring-2 bg-slate-100 text-slate-700 hover:bg-slate-200 hover:text-slate-900 focus:ring-slate-500 mt-6"
                                                href={`/recipe/${recipe.id}`}>Learn
                                                more
                                                <svg className="overflow-visible ml-3 text-slate-300 group-hover:text-slate-400"
                                                    width="3" height="6" viewBox="0 0 3 6" fill="none" stroke="currentColor" strokeWidth="2"
                                                    strokeLinecap="round" strokeLinejoin="round">
                                                    <path d="M0 0L3 3L0 6"></path>
                                                </svg></Link>
                                        </div>
                                        <img src={recipe.image} alt="" className="w-70 h-70 object-cover" />
                                    </li>

                                )}

                            </ul>





                        </div>
                    </div>


                    <div className="col-span-4 sm:col-span-3">
                        <div className="bg-white shadow rounded-lg p-6">
                            <div className="flex flex-col items-center">
                                <img src="https://ucarecdn.com/1d37c0cc-0a69-4493-909f-bf1d4bcd3a52/default_user_image.jpg" className="w-32 h-32 bg-gray-300 rounded-full mb-4 shrink-0">

                                </img>
                                <h1 className="text-xl font-bold">{user.username}</h1>
                               
                            </div>
                            

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ViewProfile