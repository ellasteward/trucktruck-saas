import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";

export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {

    try {

        await connectDB();

        const { id } = await params;

        await User.findByIdAndDelete(id);

        return NextResponse.json({
            message: "User deleted"
        });

    } catch (error:any) {

        return NextResponse.json(
            {
                message: error.message
            },
            {
                status: 500
            }
        );

    }

}
