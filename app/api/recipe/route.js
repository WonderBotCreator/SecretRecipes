import { NextResponse } from "@node_modules/next/server";

import Recipe from "@models/recipe"
import Instruction from "@models/instruction"

import { connectToDB } from "@utils/database";

export const GET = async(request)=>{
    await connectToDB()

    const recipes = await Recipe.find({}).sort({ _id: -1 }).limit(3).populate('instructions', {description:1})


    return NextResponse.json(recipes)
}