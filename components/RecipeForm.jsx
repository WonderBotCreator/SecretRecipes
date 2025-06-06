'use client'

import { FileUploaderRegular, OutpitFileEntry, UploadCtxProvider } from "@node_modules/@uploadcare/react-uploader/dist/react-uploader"
import {
  deleteFile,
  UploadcareSimpleAuthSchema,
} from '@uploadcare/rest-client';

import InstructionForm from "./InstructionForm"

import { useState, useRef } from "react"
import { useRouter } from "@node_modules/next/navigation"
import IngredientForm from "./IngredientForm"



const RecipeForm = () => {
    const router = useRouter()
    const uploaderRef = useRef(null)

    const [recipeType, setRecipeType] = useState('main dish')
    const [uploading, setUploading] = useState(false)
    const [showModal, setShowModal] = useState(false)

    const [numInstruction, setNumInstruction] = useState(0)
    const [numIngredient, setNumIngredient] = useState(0)
    const [instructions, setInstructions] = useState([])
    const [ingredients, setIngredients] = useState([])



    const [recipeName, setRecipeName] = useState('')
    const [recipeDescription, setRecipeDescription] = useState('')
    const [portionNumber, setPortionNumber] = useState('')
    const [timeConsumption, setTimeConsumption] = useState('')

    const [imageFile, setImageFile] = useState({cdnUrl:process.env.NEXT_PUBLIC_DEFAULT_IMG, uuid: ""})


    

    const handleRecipeType = (event)=>{
        setRecipeType(event.target.value)
    }

    const handleInstructionImage = (imageFile,i)=>{

        //console.log(imageFile.status)
        
        const instructionsObject = instructions
        instructionsObject[i].image = imageFile.cdnUrl
        instructionsObject[i].imageID = imageFile.uuid
        // const newImages = instructionImage.concat(imageFile)
        //setInstructionImage(null)
        setInstructions(instructions.map((instruction,index)=> index ===i? instructionsObject[i]: instruction))
    }

    const handleDeleteInstructionImage = async(imageFile,i)=>{
        const instructionsObject = instructions
        instructionsObject[i].image = process.env.NEXT_PUBLIC_DEFAULT_IMG
        instructionsObject[i].imageID = ""

        const uploadcareSimpleAuthSchema = new UploadcareSimpleAuthSchema({
            publicKey: process.env.NEXT_PUBLIC_U_PUBLIC_KEY,
            secretKey: process.env.NEXT_PUBLIC_U_SECRET_KEY,
        });

        const result = await deleteFile(
            {
                uuid: imageFile.uuid,
            },
            { authSchema: uploadcareSimpleAuthSchema }
        )
        //setInstructionImage(null)
        setInstructions(instructions.map((instruction,index)=> index ===i? instructionsObject[i]: instruction))

    }

    const handleFileUpload = async(imageFileInput) => {
        setImageFile(imageFileInput)
    }

    const handleFileChange = async (imageFile) => {
        //console.log(imageFile)

        const uploadcareSimpleAuthSchema = new UploadcareSimpleAuthSchema({
            publicKey: process.env.NEXT_PUBLIC_U_PUBLIC_KEY,
            secretKey: process.env.NEXT_PUBLIC_U_SECRET_KEY,
        });

        const result = await deleteFile(
            {
                uuid: imageFile.uuid,
            },
            { authSchema: uploadcareSimpleAuthSchema }
        )
        setImageFile({cdnUrl:process.env.NEXT_PUBLIC_DEFAULT_IMG, uuid: ""})

    }



    const handleRecipeName = (event) => {
        setRecipeName(event.target.value)
    }

    const handleRecipeDescription = (event) => {
        setRecipeDescription(event.target.value)
    }

    const handlePortionNumber = (event) => {
        const num = event.target.value.toString()
        //console.log(num)
        setPortionNumber(num)
    }

    const handleTimeConsumption = (event) => {
        const num = event.target.value.toString()
        //console.log(num)
        setTimeConsumption(num)
    }


    const handleNumInstruction = (event) => {
        event.preventDefault()
        setNumInstruction(numInstruction + 1)
        const newInstruction = {
            description: "",
            image: process.env.NEXT_PUBLIC_DEFAULT_IMG,
            imageID: ""
        }

        setInstructions(instructions.concat(newInstruction))
    }

    const handleNumIngredient = (event) => {
        event.preventDefault()
        setNumIngredient(numIngredient + 1)
        const newIngredient = {
            name: "",
            amount: ""
        }

        setIngredients(ingredients.concat(newIngredient))
    }



    const handleDeleteNumInstruction = async(event, i) => {
        event.preventDefault()

        const instructionsObject = instructions

        if (instructionsObject[i].imageID !== "") {
            const uploadcareSimpleAuthSchema = new UploadcareSimpleAuthSchema({
                publicKey: process.env.NEXT_PUBLIC_U_PUBLIC_KEY,
                secretKey: process.env.NEXT_PUBLIC_U_SECRET_KEY,
            });

            const result = await deleteFile(
                {
                    uuid: instructionsObject[i].imageID,
                },
                { authSchema: uploadcareSimpleAuthSchema }
            )
        }

        if (i > -1) {
            instructionsObject.splice(i, 1)
        }
        //console.log(instructionsObject)
        setNumInstruction(numInstruction - 1)

        setInstructions(instructionsObject)
    }

    const handleDeleteNumIngredient = (event, i) => {
        event.preventDefault()

        const ingredientObject = ingredients

        if (i > -1) {
            ingredientObject.splice(i, 1)
        }

        setNumIngredient(numIngredient - 1)
        setIngredients(ingredientObject)
    }

    const handleInstructionDescription = (event, i) => {
        const instructionsObject = instructions
        //setDescription('')
        instructionsObject[i].description = event.target.value
        //setDescription(event.target.value)
        //console.log(instructionsObject)
        setInstructions(instructions.map((instruction,index)=> index ===i? instructionsObject[i]: instruction))
    }

    const handleIngredientName = (event, i) => {
        const ingredientObject = ingredients
        //setIngredientDescription('')
        ingredientObject[i].name = event.target.value
        //setIngredientDescription(event.target.value)
        setIngredients(ingredients.map((ingredient, index)=> ingredient===i? ingredientObject[i]: ingredient))
    }

    const handleIngredientAmount = (event, i) => {
        const ingredientObject = ingredients
        //setIngredientAmount('')
        ingredientObject[i].amount = event.target.value
        //setIngredientAmount(event.target.value)
        setIngredients(ingredients.map((ingredient, index)=> ingredient===i? ingredientObject[i]: ingredient))
    }



    

    const addRecipe = async (event) => {
        event.preventDefault()
        setUploading(true)
        try {

            const response = await fetch('/api/recipe/new', {
                method: 'POST',
                body: JSON.stringify({
                    name: recipeName,
                    description: recipeDescription,
                    portionNumber: portionNumber,
                    timeConsumption: timeConsumption,
                    instructions: instructions,
                    ingredients: ingredients,
                    recipeType: recipeType,
                    image: imageFile.cdnUrl,
                    imageID: imageFile.uuid
                }),
            })

            if (!response?.ok) {
                console.log(response)
                return
            }

            if (response?.ok) {
                console.log(response)
                router.replace('/create_recipe_success')
            }

            //router.refresh()

        } catch (error) {
            console.log(error)
        }
    }

    if(uploading)
    {
        return (

            <div>
                <div className="absolute bg-white bg-opacity-60 z-10 h-full w-full flex items-center justify-center">
                    <div className="flex items-center">
                        <span className="text-3xl mr-4">Uploading Recipe</span>
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




        <div className="flex flex-col justify-center items-center w-full bg-[#e3b986] px-2">

            <div
                className={`xl:max-w-3xl bg-white w-full p-5 sm:p-10 rounded-md my-5`}
            >
                <h1
                    className={`text-center text-xl sm:text-3xl font-semibold bg-white text-black`}
                >
                    Create Recipe
                </h1>
                <div className="w-full mt-8 bg-white">
                    <div className="mx-auto max-w-xs sm:max-w-md md:max-w-lg flex flex-col gap-4">

                        {imageFile !== null ?
                            <div className="flex sm:flex gap-3">
                                <div className="w-8 flex-none ..."></div>
                                <img src={imageFile.cdnUrl} className="w-8 grow" width="100" height="100" />
                                <div className="w-8 flex-none ..."></div>
                            </div> :
                            <></>
                        }



                        <fieldset className="fieldset w-full">
                            <legend className="fieldset-legend">Recipe Name</legend>
                            <input onChange={handleRecipeName} value={recipeName} type="text" className="input w-full" placeholder="Recipe Name" />
                        </fieldset>


                        <fieldset className="fieldset w-full">
                            <legend className="fieldset-legend">Recipe Categories</legend>
                           <select onChange={handleRecipeType} value={recipeType} className="select">
  <option value="main dish">Main Dish</option>
  <option value="dessert">Dessert</option>
  <option value="drink">Drink</option>
</select>
                        </fieldset>

                        <fieldset className="fieldset w-full">
                            <legend className="fieldset-legend">Recipe Image</legend>
                            <div>

                                <FileUploaderRegular
                                    sourceList="local"
                                    useCloudImageEditor={false}
                                    classNameUploader="uc-light"
                                    pubkey={process.env.NEXT_PUBLIC_U_PUBLIC_KEY}
                                    multiple="false"
                                    accept="image/*"
                                    onFileUploadSuccess={handleFileUpload}
                                    onFileRemoved={handleFileChange}
                                />
                            </div>


                        </fieldset>
                        <fieldset className="fieldset w-full">
                            <legend className="fieldset-legend">Recipe Description</legend>
                            <textarea onChange={handleRecipeDescription} value={recipeDescription} className="textarea h-24 w-full" placeholder="Recipe Description"></textarea>
                        </fieldset>
                        <div className="flex flex-col sm:flex-row gap-3">
                            <fieldset className="fieldset w-full">
                                <legend className="fieldset-legend">Portion Number</legend>
                                <input onChange={handlePortionNumber} value={portionNumber} type="number" className="input w-full" placeholder="Portion Number" />
                            </fieldset>
                            <fieldset className="fieldset w-full">
                                <legend className="fieldset-legend">Time Consumption(minutes)</legend>
                                <input onChange={handleTimeConsumption} value={timeConsumption} type="number" className="input w-full" placeholder="Time Consumption" />
                            </fieldset>
                        </div>

                        {ingredients.map((ingredient, i) =>
                            <div key={i}>
                                <div>
                                    <IngredientForm index={i} ingredient={ingredient} handleIngredientName={(e) => handleIngredientName(e, i)} handleIngredientAmount={(e) => handleIngredientAmount(e, i)} handleDelete={(e) => handleDeleteNumIngredient(e, i)} />
                                </div>
                            </div>
                        )}

                        <button onClick={handleNumIngredient} className="mt-5 tracking-wide font-semibold bg-[#E9522C] text-gray-100 w-full py-4 rounded-lg hover:bg-[#E9522C]/90 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none">
                            <span className="ml-3">+ Add ingredient</span>
                        </button>

                        {instructions.map((instruction, i) =>
                            <div key={i}>
                                <div>
                                    <InstructionForm index={i} image={instruction.image} handleDeleteImage={handleDeleteInstructionImage} handleFileUpload={handleInstructionImage} description={instruction.description} handleDescription={(e) => handleInstructionDescription(e, i)} handleDelete={(e) => handleDeleteNumInstruction(e, i)} />
                                </div>
                            </div>
                        )}


                        <button onClick={handleNumInstruction} className="mt-5 tracking-wide font-semibold bg-[#E9522C] text-gray-100 w-full py-4 rounded-lg hover:bg-[#E9522C]/90 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none">
                            
                            <span className="ml-3">+Add instruction</span>
                        </button>
                        <button onClick={() => document.getElementById('my_modal_1').showModal()} type="submit" className="mt-5 tracking-wide font-semibold bg-[#E9522C] text-gray-100 w-full py-4 rounded-lg hover:bg-[#E9522C]/90 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none">
                            
                            <span className="ml-3">Create</span>
                        </button>


                    </div>
                </div>
            </div>



            <dialog id="my_modal_1" className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Confirm add recipe</h3>
                    <p className="py-4">Are you sure to create this recipe?</p>
                    <div className="modal-action">
                        <form method="dialog">
                            <button className="btn btn-outline btn-error">Cancel</button>
                        </form>
                        <form onSubmit={addRecipe}>
                            <button type="submit" className="btn btn-outline btn-success">Confirm</button>
                        </form>
                    </div>
                </div>
            </dialog>



        </div>

    )
}

export default RecipeForm