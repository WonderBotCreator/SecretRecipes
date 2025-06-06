import { NextResponse } from "@node_modules/next/server";

import Recipe from "@models/recipe"
import Instruction from "@models/instruction"

import { connectToDB } from "@utils/database";

import {
  deleteFile,
  UploadcareSimpleAuthSchema,
} from '@uploadcare/rest-client';


export const GET = async (request, { params }) => {
    const { id } = await params


    await connectToDB()

    const recipe = await Recipe.findById(id).populate('instructions ingredients user')

    return NextResponse.json(recipe)
}

export const PATCH = async (request, { params }) => {
    const { name, description, portionNumber, timeConsumption, instructions, image,imageID, ingredients , recipeType} = await request.json()
    const { id } = await params

    const newRecipe = {
        name: name,
        description: description,
        portionNumber: portionNumber,
        timeConsumption: timeConsumption,
        instructions: instructions,
        ingredients: ingredients,
        image: image,
        imageID: imageID,
        recipeType: recipeType
    }

    try {
        await connectToDB()



        const existingRecipe = await Recipe.findById(id)

        if (!existingRecipe) {
            return NextResponse.json({ message: "Recipe not found" }, { status: 404 })
        }


        existingRecipe.name = newRecipe.name
        existingRecipe.description = newRecipe.description
        existingRecipe.portionNumber = newRecipe.portionNumber
        existingRecipe.timeConsumption = newRecipe.timeConsumption
        existingRecipe.image = newRecipe.image
        existingRecipe.imageID = newRecipe.imageID
        existingRecipe.recipeType = newRecipe.recipeType

        existingRecipe.ingredients = []

        for (let ingredient of newRecipe.ingredients) {
            existingRecipe.ingredients.push(ingredient)
        }

         

        for (let instruction of existingRecipe.instructions) {
            await Instruction.findByIdAndDelete(instruction)
        }

        //console.log(newRecipe.instructions)
        existingRecipe.instructions = []

        for (let instruction of newRecipe.instructions) {

            const newInstruction = new Instruction({
                description: instruction.description,
                recipe: existingRecipe.id,
                image: instruction.image,
                imageID: instruction.imageID
            })

            const savedInstruction = await newInstruction.save()
            existingRecipe.instructions.push(savedInstruction)
        }


        await existingRecipe.save()

        return NextResponse.json({ message: "Successfully update" }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ message: "Error" }, { status: 400 })
    }
}


export const DELETE = async(request, {params})=>{
    const { recipeID } = await request.json()
    const {id} = await params
    try{
        await connectToDB()

        const recipe = await Recipe.findById(recipeID).populate('instructions')

        const uploadcareSimpleAuthSchema = new UploadcareSimpleAuthSchema({
                publicKey: process.env.NEXT_PUBLIC_U_PUBLIC_KEY,
                secretKey: process.env.NEXT_PUBLIC_U_SECRET_KEY,
        });
        //Delete Cover Image
        if(recipe.imageID !== "")
        {
            
            const result = await deleteFile(
                {
                    uuid: recipe.imageID,
                },
                { authSchema: uploadcareSimpleAuthSchema }
            )
        }


        //Delete instruction Image
         for (let instruction of recipe.instructions)
        {
             
            const currentInstruction = await Instruction.findById(instruction)
            console.log(currentInstruction.imageID)
            if(instruction.imageID !== "")
            {
               
                const result = await deleteFile(
                    {
                        uuid: currentInstruction.imageID,
                    },
                    { authSchema: uploadcareSimpleAuthSchema }
                )
            }

            await Instruction.findByIdAndDelete(instruction)
        }

         await Recipe.findByIdAndDelete(recipeID)

        return NextResponse.json({message:"Recipe deleted successfully"}, {status:200})
    }catch(error){
        return NextResponse.json({message:"Error deleting recipe"}, {status:500})
    }
}