import { connectDB } from "@/lib/mongodb";
import Job from "@/models/Job";
import User from "@/models/User";
import { NextResponse } from "next/server";

export async function GET(
    request: Request,
    { params }: { params: Promise<{email:string}> }
){

    await connectDB();

    const {email} = await params;

    const user = await User.findOne({

        email: decodeURIComponent(email)

    });

    if(!user){

        return NextResponse.json([]);
    }

    const jobs = await Job.find({

        driverId:user._id

    }).populate("driverId");

    return NextResponse.json(jobs);

}