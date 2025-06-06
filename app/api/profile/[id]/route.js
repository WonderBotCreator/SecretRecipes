import { getServerSession } from "next-auth/next";
import { NextResponse } from "@node_modules/next/server";
import User from "@models/user"
import { connectToDB } from "@utils/database";

export async function GET(request, { params }) {

    const { id } = await params

    try {

        await connectToDB()
        const user = await User.findById(id).populate('recipes')

        if (!user) {
            return NextResponse.json({ message: 'Something went wrong' }, { status: 400 })
        }

        return NextResponse.json(user, { status: 201 })

    } catch (error) {

    }

}