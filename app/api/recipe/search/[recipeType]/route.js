import { NextResponse } from "@node_modules/next/server";

import Recipe from "@models/recipe"

import { connectToDB } from "@utils/database";


export const GET = async (request, { params }) => {
    const { recipeType } = await params

    await connectToDB()

    const recipes = recipeType !== 'all'
                        ? await Recipe.find({recipeType: recipeType}).populate('instructions ingredients user')
                        : await Recipe.find().populate('instructions ingredients user')

    return NextResponse.json(recipes)
}