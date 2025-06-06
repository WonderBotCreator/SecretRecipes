import { NextResponse } from "next/server";

import Recipe from "@models/recipe"

export async function GET(req){
    const {searchParams} = new URL(req.url)
    const query = searchParams.get('query')
    console.log(query)

    const recipes = await Recipe.find({})

    if(query === '')
    {
        return NextResponse.json(recipes)
    }
    const filteredRecipe = recipes.filter((recipe)=>{
        return recipe.name.toLowerCase().includes(query.toLowerCase())
    })

    return NextResponse.json(filteredRecipe)
}