'use client'


import { FileUploaderRegular, OutpitFileEntry, UploadCtxProvider } from "@node_modules/@uploadcare/react-uploader/dist/react-uploader"
import {
  deleteFile,
  UploadcareSimpleAuthSchema,
} from '@uploadcare/rest-client';

import Link from "@node_modules/next/link"
import { useState, useEffect } from "react"
import { useRouter } from "@node_modules/next/navigation"

const ProfileDetail = ()=>{
    const router = useRouter()
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    const [currentRecipe, setCurrentRecipe] = useState(null)
    const [imageFile, setImageFile] = useState({cdnUrl: process.env.NEXT_PUBLIC_DEFAULT_USER_IMG, uuid:''})

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
            setImageFile({cdnUrl: process.env.NEXT_PUBLIC_DEFAULT_USER_IMG, uuid:''})
    
    }
    
    
    const handleFileUpload = async(imageFile2) => {
        setLoading(true)

        if(imageFile.uuid !== "")
        {
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
        }
        const response = await fetch('/api/profile', {
                method: 'PUT',
                 body: JSON.stringify({
                    image: imageFile2.cdnUrl,
                    imageID: imageFile2.uuid
                }),
        })


        const data = await response.json()


        if(!data?.success)
        {
            setLoading(false)
            //setNotification(data?.message)
            return
        }
        //console.log(data)

       router.replace(`/protected/profile/${user.id}`)



        setImageFile(imageFile)
    }


    const handleCurrentRecipe = (event,recipe)=>{
        setCurrentRecipe(recipe)
        document.getElementById('my_modal_1').showModal()
    }


    const deleteRecipe = async(event)=>{
        event.preventDefault()
        setLoading(true)
       
        try {

            const response = await fetch(`/api/recipe/${currentRecipe.id}`, {
                method: 'DELETE',
                body: JSON.stringify({
                    recipeID: currentRecipe.id
                }),
            })

            if (!response?.ok) {
                //console.log(response)
                setLoading(false)
                return
            }

            if (response?.ok && user) {
                //console.log(user.id)
                router.replace(`/protected/profile/${user.id}/delete_recipe_success`)
                //router.refresh()
            }
            //console.log(response)
            //router.refresh()

        } catch (error) {
            //console.log(error)
        }
    }

     useEffect(() => {
            const fetchUser = async () => {
                try {
                    const response = await fetch('/api/profile')
                    const data = await response.json()
                    //console.log(data)
                    setUser(data)
                    if(data.imageID !== '')
                    {
                        setImageFile({
                            cdnUrl: data.image,
                            uuid: data.imageID
                        })
                    }
                    setLoading(false)
    
                } catch (error) {
    
                }
    
            }
            fetchUser()
        }, [])

        if(loading)
        {
            return(<div>
            <div className="absolute bg-white bg-opacity-60 z-10 h-full w-full flex items-center justify-center">
    <div className="flex items-center">
      <span className="text-3xl mr-4">Loading</span>
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

    return(
        <div className="bg-[#e3b986]">
            <div className="container mx-auto py-8">
                <div className="grid grid-cols-4 sm:grid-cols-12 gap-6 px-4">
                    
                    <div className="col-span-4 sm:col-span-9">
                        
                        <div className="bg-white shadow rounded-lg p-6">
                            <div className="flex justify-center items-center">
                            <h2 className="text-xl font-bold mb-4"></h2>
                           </div>
                            
                             <h2 className="text-xl font-bold mt-6 mb-4">Recipes</h2>
                            <div className="flex justify-center items-center">

                            {user.recipes.length > 0?
                            
                                <table className="table">
                                 {/* head */}
                                 <thead>
                                     <tr>
                                         <th></th>
                                         <th>Recipe Name</th>
                                         <th></th>
                                     </tr>
                                 </thead>
                                 <tbody>
                                     {user.recipes.map((recipe,i)=>

                                        <tr key={recipe.id}>
                                            <th>{i+1}</th>
                                            <th>{recipe.name}</th>
                                            <th><Link href={`/protected/profile/${user.id}/recipe/${recipe.id}/edit`}><button className="btn btn-outline btn-info">edit</button></Link></th>
                                            <th><button onClick={(e)=>handleCurrentRecipe(e,recipe)} className="btn btn-outline btn-error">delete</button></th>
                                        </tr>
                                     )}
                                 </tbody>
                             </table>:
                             <div className="h-96">No Recipe</div>
                        
                            }
                            
                           </div>
                        
                <dialog id="my_modal_1" className="modal">
                    <div className="modal-box">
                        <h3 className="font-bold text-lg">Confirm delete {currentRecipe?.name}</h3>
                        <p className="py-4">Are you sure to delete {currentRecipe?.name}?</p>
                        <div className="modal-action">
                            <form method="dialog">
                                <button  className="btn btn-outline btn-error">Cancel</button>
                            </form>
                            <form onSubmit={deleteRecipe} >
                                <button type="submit" className="btn btn-outline btn-success">Confirm</button>
                            </form>
                        </div>
                    </div>
                </dialog> 


                          
                            
                        </div>
                    </div>


                    <div className="col-span-4 sm:col-span-3">
                        <div className="bg-white shadow rounded-lg p-6">
                            <div className="flex flex-col items-center">
                                <img src="https://ucarecdn.com/1d37c0cc-0a69-4493-909f-bf1d4bcd3a52/default_user_image.jpg" className="w-32 h-32 bg-gray-300 rounded-full mb-4 shrink-0">

                                </img>
                                <h1 className="text-xl font-bold">{user.username}</h1>
                                <div className="mt-6 flex flex-wrap gap-4 justify-center">
                                     <div className="justify-center items-center">
                                  <fieldset className="fieldset w-full justify-center items-center">
                            {/* <legend className="justify-center ">profile image</legend> */}
                            {/* <div>

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
                            </div> */}


                        </fieldset>
                            </div>
                                </div>
                            </div>
                            <hr className="my-6 border-t border-gray-300" />
                                <div className="flex flex-col">
                                    
                                </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProfileDetail