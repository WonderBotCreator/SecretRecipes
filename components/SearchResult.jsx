'use client'

import Link from "@node_modules/next/link"
import { useEffect, useState } from "react"


const SearchResult = ({ query, recipesType }) => {
    const [recipes, setRecipes] = useState([])
    const [loading, setLoading] = useState(true)
    const [recipeType, setRecipeType] = useState(recipesType)
    const [search, setSearch] = useState(query)
    const [searchHeader, setSearchHeader] = useState(query)

    const handleRecipeType = (event)=>{
        setRecipeType(event.target.value)
    }

    const handleSearch = (event)=>{
        setSearch(event.target.value)
    }


    const handleSubmitSearch = async(event) => {
        event.preventDefault()
        setLoading(true)
        const response = await fetch(`/api/recipe/search/${recipeType}/${search}`)
        const data = await response.json()
        setRecipes(data)
        setSearchHeader(search)
        setLoading(false)

    }

    useEffect(() => {
        const fetchRecipes = async () => {
            try {
                const response = await fetch(`/api/recipe/search/${recipeType}/${search}`)
                const data = await response.json()
                console.log(data)
                setRecipes(data)
                setLoading(false)

            } catch (error) {

            }

        }
        fetchRecipes()
    }, [])

    if (loading) {
        return (<div>
                <div className="absolute bg-white bg-opacity-60 z-10 h-full w-full flex items-center justify-center">
                    <div className="flex items-center">
                        <span className="text-3xl mr-4">Loading</span>
                        <svg className="animate-spin h-8 w-8 text-gray-800" xmlns="http://www.w3.org/2000/svg" fill="none"
                            viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                            </path>
                        </svg>
                    </div>
                </div>
            </div>)
    }

    return (
        <div className="bg-[#e3b986]">
            <div className="container mx-auto py-8">
                <div className="grid grid-cols-4 md:grid-cols-12 gap-6 px-4">

                    <div className="col-span-4 md:col-span-3">
                        <div className="bg-white shadow rounded-lg p-6">
                            <div className="flex flex-col items-center">
                                <h1 className="text-xl font-bold">Search</h1>
                                <form onSubmit={handleSubmitSearch} className="flex flex-col items-center gap-4">
                                    <input onChange={handleSearch} value={search} type="text" placeholder="Type here" className="input" />
                                      <select onChange={handleRecipeType} value={recipeType} className="select">
             <option value="all">All</option>                           
  <option value="main dish">Main Dish</option>
  <option value="dessert">Dessert</option>
  <option value="drink">Drink</option>
</select>

                                    <button type="submit" className="btn btn-primary">search</button>
                                </form>
                            </div>


                        </div>
                    </div>

                    <div className="col-span-4 md:col-span-9">

                        <div className="bg-white shadow rounded-lg p-6">
                            <div className="flex justify-center items-center">
                                <h2 className="text-xl font-bold mb-4"></h2>
                            </div>

                            <h2 className="text-xl font-bold mt-6 mb-4">Search Results '{searchHeader}'</h2>
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
                                                <p>{recipe.description}</p>
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



                </div>
            </div>
        </div>
    )
}

export default SearchResult