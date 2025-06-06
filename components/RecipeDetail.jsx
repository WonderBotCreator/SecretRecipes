'use client'


import Link from "@node_modules/next/link"
import { useEffect, useState } from "react"

const RecipeDetail = ({ id }) => {
    const [recipe, setRecipe] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchRecipe = async () => {
            try {
                const response = await fetch(`/api/recipe/${id}`)
                const data = await response.json()
                console.log(data)
                setRecipe(data)
                setLoading(false)

            } catch (error) {

            }

        }
        fetchRecipe()
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
                <div className="grid grid-cols-4 sm:grid-cols-12 gap-6 px-4">
                    
                    <div className="col-span-4 sm:col-span-9">
                        
                        <div className="bg-white shadow rounded-lg p-6 ">
                            <div className="flex justify-center items-center">
                            <h2 className="text-xl font-bold mb-4">{recipe.name}</h2>
                           </div>
                            <div className="flex justify-center items-center">
                                <img  className="w-96 h-96 object-cover" src={recipe.image? recipe.image:""}  width="500" height="500" />
                            </div>
                             
                            
                        <div>
                            <h2 className="text-xl font-bold mb-4">Description</h2>
                            <p className="text-gray-700">{recipe.description}
                            </p>
</div>
                             

                         <h2 className="text-xl font-bold mt-6 mb-4">Detail</h2>
                        <table className="table">
                                 {/* head */}
                                 <thead>
                                     <tr>
                                        
                                         <th></th>
                                         <th></th>
                                     </tr>
                                 </thead>
                                 <tbody>
                                     {/* row 1 */}
                                    

                                         <tr >
                                            
                                             <td>Portion Number </td>
                                             <td>{recipe.portionNumber} persons</td>
                                         </tr>
                                         <tr >
                                            
                                             <td>Time Consumption</td>
                                             <td>{recipe.timeConsumption} minutes</td>
                                         </tr>
                                     
                                 </tbody>
                             </table>

                             <h2 className="text-xl font-bold mt-6 mb-4">Ingredient</h2>
                            <div className="flex justify-center items-center">
                            <table className="table">
                                 {/* head */}
                                 <thead>
                                     <tr>
                                         <th></th>
                                         <th>Name</th>
                                         <th>Amount</th>
                                     </tr>
                                 </thead>
                                 <tbody>
                                     {/* row 1 */}
                                     {recipe.ingredients.map((ingredient, i) =>

                                         <tr key={ingredient.name}>
                                             <th>{i + 1}</th>
                                             <td>{ingredient.name}</td>
                                             <td>{ingredient.amount}</td>
                                         </tr>
                                     )}
                                 </tbody>
                             </table>
                           </div>


                            <h2 className="text-xl font-bold mt-6 mb-4">Instructions</h2>

                            {recipe.instructions.map((instruction,i)=>
                                <div key={instruction.id} className="mb-6">
                                    <div className="flex justify-between flex-wrap gap-2 w-full">
                                        <span className="text-gray-700 font-bold">{i+1}</span>
                                    </div>

                                    <div className="flex justify-center items-center">
                                <img  className="w-50 h-50 object-cover" src={instruction.image? instruction.image:""}  width="200" height="200" />
                            </div>
                                    <p className="mt-2">
                                        {instruction.description}
                                    </p>
                                </div>

                            )}
                            
                        </div>
                    </div>


                    <div className="col-span-4 sm:col-span-3">
                        <div className="bg-white shadow rounded-lg p-6">
                            <div className="flex flex-col items-center">
                                <img src="https://randomuser.me/api/portraits/men/94.jpg" className="w-32 h-32 bg-gray-300 rounded-full mb-4 shrink-0">

                                </img>
                                <h1 className="text-xl font-bold">{recipe.user.username}</h1>
                                <div className="mt-6 flex flex-wrap gap-4 justify-center">
                                    <Link href={`/view_profile/${recipe.user.id}`} className="bg-gray-300 hover:bg-gray-400 text-gray-700 py-2 px-4 rounded">View Profile</Link>
                                </div>
                            </div>
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RecipeDetail