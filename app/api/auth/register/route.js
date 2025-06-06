import { NextResponse } from "@node_modules/next/server";
import { connectToDB } from "@utils/database";
import {hashPassword} from "@utils/hash";
import User from "@models/user"

export const POST = async(request)=>{
     const {email, username, password, image, imageID} = await request.json()

     const newUser = {
        email: email,
        username: username,
        password: password,
        image: image,
        imageID: imageID
     }
    try{
        await connectToDB()
        
        const userExists = await User.findOne({email: newUser.email})

        

        if(userExists){
            return NextResponse.json({success: false, message: 'A user with the same email already exists',
                userExists: true
            })
        }

        const usernameExist = await User.findOne({username: newUser.username})

         if(usernameExist){
            return NextResponse.json({success: false, message: 'A user with the same username already exists',
                userExists: true
            })
        }
        
        newUser.password = await hashPassword(newUser.password)

        const user = new User({
            username: newUser.username,
            email: newUser.email,
            passwordHash: newUser.password,
            image: newUser.image,
            imageID: newUser.imageID
        })

        

        const savedUser = await user.save()
        

        return NextResponse.json({success: true, message: "User signed up successfuly"},{status: 201})
    }catch(error){
        console.log(error)
        return NextResponse.json({success: false, message: "Signed up faield"},{status: 400})
    }

    
}