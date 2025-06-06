

import { FileUploaderRegular, OutpitFileEntry, UploadCtxProvider } from "@node_modules/@uploadcare/react-uploader/dist/react-uploader"

const InstructionForm = ({index, description, handleDescription, handleDelete, handleFileUpload, image, handleDeleteImage, p_key})=>{
   
    

    return(
        
            <fieldset className="fieldset w-full">
                            <legend className="fieldset-legend">Instruction</legend>

                             {image !== null ?
                            <div className="flex justify-center item-center sm:flex gap-1">
                                
                                <img src={image} className="w-50" width="50" height="50" />
                                
                            </div> :
                            <></>
                        }
                             <div>
                            
                                                            <FileUploaderRegular
                                                                sourceList="local"
                                                                useCloudImageEditor={false}
                                                                classNameUploader="uc-light"
                                                                pubkey={process.env.NEXT_PUBLIC_U_PUBLIC_KEY}
                                                                multiple="false"
                                                                accept="image/*"
                                                                onFileUploadSuccess={(imageFile)=>handleFileUpload(imageFile, index)}
                                                                onFileRemoved={(imageFile)=>handleDeleteImage(imageFile, index)}
                                                            />
                            </div>
                            <textarea value={description} onChange={handleDescription} className="textarea h-24 w-full" placeholder="Instruction..."></textarea>
                            <button onClick={handleDelete} className="btn btn-outline btn-error">Remove</button>
                </fieldset>
        
    )
}

export default InstructionForm