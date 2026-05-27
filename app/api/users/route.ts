import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function GET(){

    try{

        await connectDB();

        const users = await User.find();

        return NextResponse.json(users);

    }
    catch(error){

        console.log(error);

        return NextResponse.json(
            {message:"Failed to load users"},
            {status:500}
        );

    }

}

export async function POST(request: Request){

    try{

        await connectDB();

        const body = await request.json();

        const existingUser = await User.findOne({
            email: body.email
        });

        if(existingUser){

            return NextResponse.json(
                {message:"User already exists"},
                {status:400}
            );

        }

        const hashedPassword =
            await bcrypt.hash(body.password,10);

        const user = await User.create({

            name: body.name,
            email: body.email,
            password: hashedPassword,
            role: body.role

        });

        return NextResponse.json(user);

    }
    catch(error){

        console.log(error);

        return NextResponse.json(
            {message:"Failed creating user"},
            {status:500}
        );

    }

}