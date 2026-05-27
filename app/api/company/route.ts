import { connectDB } from "@/lib/mongodb";
import Company from "@/models/Company";
import { NextResponse } from "next/server";

export async function GET() {

    await connectDB();

    // Create a company automatically
    await Company.create({

        name: "TruckTruck Demo Company"

    });

    const companies = await Company.find();

    return NextResponse.json(companies);

}