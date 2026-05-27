import { connectDB } from "@/lib/mongodb";
import Job from "@/models/Job";
import { NextResponse } from "next/server";

export async function PUT(
    request: Request,
    { params }: { params: Promise<{id:string}> }
){

    await connectDB();

    const body = await request.json();

    const {id} = await params;

    const updatedJob =
        await Job.findByIdAndUpdate(

            id,

            {
                driverId: body.driverId
            },

            {new:true}

        );

    return NextResponse.json(updatedJob);

}