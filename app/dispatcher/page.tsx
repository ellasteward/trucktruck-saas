"use client";

import Navbar from "@/components/Navbar";
import ProtectedRoute from "@/components/ProtectedRoute";
import Link from "next/link";

export default function DispatcherPage(){

    return(

        <ProtectedRoute
        allowedRoles={["ADMIN","DISPATCHER"]}
        >

        <main className="min-h-screen">

            <Navbar/>

            <div className="p-8">

                <h1 className="text-4xl font-bold mb-8">

                    Dispatcher Dashboard

                </h1>

                <div className="grid grid-cols-2 gap-6">

                    <Link
                        href="/jobs"
                        className="border rounded-xl p-6 hover:bg-gray-900"
                    >

                        <h2 className="text-2xl font-bold">

                            Manage Jobs

                        </h2>

                        <p>

                            Create and assign transport jobs

                        </p>

                    </Link>

                    <Link
                        href="/drivers"
                        className="border rounded-xl p-6 hover:bg-gray-900"
                    >

                        <h2 className="text-2xl font-bold">

                            Drivers

                        </h2>

                        <p>

                            View available drivers

                        </p>

                    </Link>

                </div>

            </div>

        </main>

        </ProtectedRoute>


    )

}