import { NextResponse } from "@node_modules/next/server";

import Recipe from "@models/recipe"
import Instruction from "@models/instruction"

import { connectToDB } from "@utils/database";

export const GET = async(request)=>{
    await connectToDB()

    const recentRecipes = await Recipe.find({}).sort({ _id: -1 }).limit(3)
    const recentMainDish = await Recipe.find({recipeType: 'main dish'}).sort({ _id: -1 }).limit(3)
    const recentDrink = await Recipe.find({recipeType: 'drink'}).sort({ _id: -1 }).limit(3)
    const recentDessert = await Recipe.find({recipeType: 'dessert'}).sort({ _id: -1 }).limit(3)


    return NextResponse.json({recent: recentRecipes, mainDish: recentMainDish, drink: recentDrink, dessert: recentDessert})
}