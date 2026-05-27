import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(request: Request){

    try{

        await connectDB();

        const body = await request.json();

        console.log("Email:", body.email);

        const user = await User.findOne({
            email: body.email
        });

        console.log("Found user:", user);

        if(!user){

            return NextResponse.json(
                {message:"User not found"},
                {status:401}
            );

        }

        const passwordMatch =
            await bcrypt.compare(
                body.password,
                user.password
            );

        console.log("Password match:", passwordMatch);

        if(!passwordMatch){

            return NextResponse.json(
                {message:"Invalid password"},
                {status:401}
            );

        }

        return NextResponse.json({

            id:user._id,
            name:user.name,
            role:user.role

        });

    }
    catch(error){

        console.log(error);

        return NextResponse.json(
            {message:"Login failed"},
            {status:500}
        );

    }

}