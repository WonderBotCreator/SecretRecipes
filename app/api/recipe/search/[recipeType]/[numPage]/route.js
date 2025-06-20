import { NextResponse } from "@node_modules/next/server";

import Recipe from "@models/recipe"

import { connectToDB } from "@utils/database";


export const GET = async (request, { params }) => {
    const { recipeType, numPage} = await params

    await connectToDB()


     const recipes = recipeType !== 'all'
                    ? await Recipe.find({recipeType: recipeType}).sort({ _id: -1 })
                    : await Recipe.find().sort({ _id: -1 })
    

    
    // const filteredRecipe = recipes.filter((recipe)=>{
    //     return recipe.name.toLowerCase().includes(query.toLowerCase())
    // })

    const lengthOfEachPage = 6

    const filteredRecipe = recipes

    const numRecipes = filteredRecipe.length

    let pages = Math.floor(numRecipes / lengthOfEachPage)

    const remaining = numRecipes%lengthOfEachPage

    if(remaining > 0)
    {
        pages+=1
    }

    // console.log("pages "+ numRecipes)

    let sumRecipes = []

    const numPages = parseInt(numPage)
    
    let last = numPages*lengthOfEachPage
    const start = numPages === 1? 0: (lengthOfEachPage*(numPages-1))


    if(numPages > pages || numPages < 1)
    {
        sumRecipes = []
        return NextResponse.json({recipes:sumRecipes, pages: pages})
    }



    if(numPages === pages && remaining > 0)
    {
        // console.log(start+remaining)
        last = start+remaining
    }

    for(let i = start;i< last;i++ )
    {
        //console.log(filteredRecipe[i])
        sumRecipes.push(filteredRecipe[i])
    }


   

    return NextResponse.json({recipes:sumRecipes, pages: pages})
}