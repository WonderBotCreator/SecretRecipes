import { getServerSession } from "next-auth/next";
import { NextResponse } from "@node_modules/next/server";
import { authOptions } from "../auth/[...nextauth]/route";
import User from "@models/user"

export async function GET(request){
    const session = await getServerSession(authOptions)

    console.log('session', session)

    const user = await User.findOne({ username: session.user.name }).populate('recipes')

    if(!user)
    {
         return NextResponse.json({message: 'Something went wrong'}, {status:400})
    }



    return NextResponse.json(user, {status:201})
}