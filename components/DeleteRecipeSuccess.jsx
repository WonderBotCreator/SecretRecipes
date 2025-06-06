'use client'

import { useRouter } from "@node_modules/next/navigation"
import { useState } from "react"

const DeleteRecipeSuccess = ({id})=>{
     const router = useRouter()
            const [currentTime, setCurrentTime] = useState(5)
        
            setTimeout(() => {
                if(currentTime == 1){
                    router.replace(`/protected/profile/${id}`)
                }
        
                //console.log("Delayed for 1 second.");
                setCurrentTime(currentTime-1)
            }, "1000");
        
        
            return (
                <div>
                    Delete recipe successfully {currentTime}
                </div>
            )
        }

export default DeleteRecipeSuccess