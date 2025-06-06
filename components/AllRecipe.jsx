'use client'

import Link from "@node_modules/next/link"
import { useEffect, useState } from "react"

const AllRecipe = ({recipeType}) => {
    const [recipes, setRecipes] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchRecipes = async () => {
            try {

                if(recipeType === 'All')
                {
                    const response = await fetch('/api/recipe')
                    const data = await response.json()
                    setRecipes(data)
                    setLoading(false)
                }
                else if(recipeType === 'Main Dish')
                {
                    const response = await fetch(`/api/recipe/search/${'main dish'}`)
                    const data = await response.json()
                    setRecipes(data)
                    setLoading(false)
                }
                else if(recipeType === 'Drink')
                {
                    const response = await fetch(`/api/recipe/search/${'drink'}`)
                    const data = await response.json()
                    setRecipes(data)
                    setLoading(false)
                }
                else if(recipeType === 'Dessert')
                {
                    const response = await fetch(`/api/recipe/search/${'dessert'}`)
                    const data = await response.json()
                    setRecipes(data)
                    setLoading(false)
                }
            

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

    if(!loading && recipes.length === 0)
    {
        return(<></>)
    }

    return (




        <div className="max-w-screen-xl mx-auto p-5 sm:p-10 md:p-16 bg-[#ffffff]">

            <div className="border-b mb-5 flex justify-between text-sm">
                <div className="flex items-center pb-2 pr-2 border-b-2 uppercase">
                    {recipeType === 'All'?
                        <p className="font-semibold inline-block color-warning">Recent recipe</p>:
                        recipeType === 'Main Dish'?
                        <p className="font-semibold inline-block color-warning">Recent main dish</p>:
                        recipeType === 'Drink'?
                        <p className="font-semibold inline-block color-warning">Recent drink</p>:
                        recipeType === 'Dessert'?
                        <p className="font-semibold inline-block color-warning">Recent dessert</p>:
                        <></>
                    }
                    
                </div>
                {recipeType === 'All'?
                    <Link href="/search_all/">See All</Link>:
                    recipeType === 'Main Dish'?
                    <Link href="/search_result/main_dish">See All</Link>:
                    recipeType === 'Drink'?
                    <Link href="/search_result/drink">See All</Link>:
                    recipeType === 'Dessert'?
                    <Link href="/search_result/dessert">See All</Link>:<></>
            
                }
                
            </div>


            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">


                {recipes.map(recipe =>

                    <div key={recipe.id} className="card col-span-1 bg-base-100 w-96 shadow-sm">
                        <figure>
                            <img
                                className="w-70 h-70 object-cover"
                                src={recipe.image ? recipe.image : "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"}
                                alt="Shoes" />
                        </figure>
                        <div className="card-body">
                            <h2 className="card-title">
                                <Link href={`/recipe/${recipe.id}`}>{recipe.name}</Link>
                                {recipe.recipeType === 'main dish' ?
                                    <div className="badge badge-warning">{recipe.recipeType}</div> :
                                    recipe.recipeType === 'drink' ?
                                        <div className="badge badge-info">{recipe.recipeType}</div> :
                                        recipe.recipeType === 'dessert' ?
                                            <div className="badge badge-secondary">{recipe.recipeType}</div> : <></>
                                }

                            </h2>
                            <p>A card component has a figure, a body part, and inside body there are title and actions parts</p>
                            <div className="card-actions justify-end">
                                <Link href={`/recipe/${recipe.id}`} className="btn btn-soft">Detail</Link>
                            </div>
                        </div>
                    </div>

                )}

            </div>

        </div>
    )
}

export default AllRecipe