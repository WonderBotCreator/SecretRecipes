import { getServerSession } from "next-auth/next";
import { NextResponse } from "@node_modules/next/server";
import User from "@models/user"
import { connectToDB } from "@utils/database";

export async function GET(request, { params }) {

    const { id, numPage } = await params

    try {

        await connectToDB()
        const user = await User.findById(id).populate('recipes')

        if (!user) {
            return NextResponse.json({ message: 'Something went wrong' }, { status: 400 })
        }


        const filteredRecipe = user.recipes


        const lengthOfEachPage = 6

    //const filteredRecipe = recipes

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
        return NextResponse.json({user: user, recipes: sumRecipes}, { status: 201 })
    }



    if(numPages === pages && remaining > 0)
    {
        // console.log(start+remaining)
        last = start+remaining
    }

    for(let i = start;i< last;i++ )
    {
        console.log(filteredRecipe[i])
        sumRecipes.push(filteredRecipe[i])
    }





        return NextResponse.json({user: user, recipes: sumRecipes}, { status: 201 })

    } catch (error) {

    }

}