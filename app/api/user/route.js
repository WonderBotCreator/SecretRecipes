import { NextResponse } from "@node_modules/next/server";

import User from "@models/user"

import { connectToDB } from "@utils/database";

export const GET = async(request)=>{
    await connectToDB()

    const users = await User.find({}).populate('recipes')

    return NextResponse.json(users)
}