import { connectDB } from "@/lib/mongodb";
import Job from "@/models/Job";
import { NextResponse } from "next/server";

export async function GET() {

    await connectDB();

    const jobs = await Job.find().populate("driverId");

    return NextResponse.json(jobs);

}

export async function POST(request: Request) {

    await connectDB();

    const body = await request.json();

    const job = await Job.create({

        pickupLocation: body.pickupLocation,
        deliveryLocation: body.deliveryLocation,

        jobDate: body.jobDate,
        weight: body.weight,
        truckType: body.truckType,

        comments: body.comments || [],

        status: body.status || "PENDING",

        driverId: body.driverId || null

    });

    return NextResponse.json(job);

}