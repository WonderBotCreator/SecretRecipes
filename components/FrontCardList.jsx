import Link from "@node_modules/next/link"

const FrontCardList = ({recipes ,recipeType})=>
{
    return(
        <>
         <div className="border-b mb-5 flex justify-between text-sm mt-20">
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
                            <p>{recipe.description}</p>
                            <div className="card-actions justify-end">
                                <Link href={`/recipe/${recipe.id}`} className="btn btn-soft">Detail</Link>
                            </div>
                        </div>
                    </div>

                )}




                

            </div>
            </>
    )
}

export default FrontCardList