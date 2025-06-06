import { NextResponse } from "@node_modules/next/server";
import { getServerSession } from "next-auth/next";
import { connectToDB } from "@utils/database";
import { authOptions } from "@app/api/auth/[...nextauth]/route";
import Recipe from "@models/recipe"
import User from "@models/user"
import Instruction from "@models/instruction"

export const POST = async(request)=>{
     const {name, description, portionNumber, timeConsumption, instructions, image, imageID, ingredients, recipeType} = await request.json()

     const newRecipe = {
        name: name,
        description: description,
        portionNumber: portionNumber,
        timeConsumption: timeConsumption,
        instructions: instructions,
        ingredients: ingredients,
        recipeType: recipeType,
        image: image,
        imageID: imageID
     }
    try{

        const session = await getServerSession(authOptions)
        
        await connectToDB()

        const user = await User.findOne({ username: session.user.name })

        if(!user)
        {
            return NextResponse.json({message: 'Something went wrong'}, {status:400})
        }
        
        const recipe = new Recipe({
            name: newRecipe.name,
            description: newRecipe.description,
            portionNumber: newRecipe.portionNumber,
            timeConsumption: newRecipe.timeConsumption,
            ingredients: newRecipe.ingredients,
            recipeType: newRecipe.recipeType,
            user: user,
            image:newRecipe.image,
            imageID: newRecipe.imageID,
        })

        

        let savedRecipe = await recipe.save()

        user.recipes.push(savedRecipe)

        await user.save()

        
        const currentRecipe = await Recipe.findById(savedRecipe.id)

        let instructions = []
        for (let instruction of newRecipe.instructions) {

            const newInstruction = new Instruction({
                description: instruction.description,
                recipe: savedRecipe._id,
                image: instruction.image,
                imageID: instruction.imageID
            })

            instructions.push(newInstruction)
	        const savedInstruction = await newInstruction.save()
            currentRecipe.instructions.push(savedInstruction)
            //console.log(savedInstruction)
        }

        //console.log(currentRecipe)

      
        await currentRecipe.save()
        

        return NextResponse.json({success: true, message: "Add recipe successfuly"},{status: 201})
    }catch(error){
        console.log(error)
        return NextResponse.json({success: false, message: "Add recipe faield"},{status: 400})
    }

    
}