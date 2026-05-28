"use client";

import DriverSidebar from "@/components/DriverSidebar";
import ProtectedRoute from "@/components/ProtectedRoute";
import { useEffect, useState } from "react";

export default function DriverPage(){

    const [jobs,setJobs] = useState<any[]>([]);

    async function loadJobs(){

        const email =
            localStorage.getItem("email");

        const response =
            await fetch("/api/jobs");

        const data =
            await response.json();

        const myJobs =
            data.filter(
                (job:any)=>
                    job.driverId?.email===email
            );

        setJobs(myJobs);

    }

    async function updateStatus(job:any){

        let newStatus = "PENDING";

        if(job.status==="PENDING")
            newStatus = "IN_PROGRESS";

        else if(job.status==="IN_PROGRESS")
            newStatus = "COMPLETED";

        else
            return;

        await fetch(`/api/jobs/${job._id}`,{

            method:"PUT",

            headers:{
                "Content-Type":"application/json"
            },

            body:JSON.stringify({

                status:newStatus

            })

        });

        loadJobs();

    }

    useEffect(()=>{

        loadJobs();

    },[]);

    return(

        <ProtectedRoute
            allowedRoles={["DRIVER"]}
        >

            <div className="flex bg-zinc-100 min-h-screen">

                <DriverSidebar />

                <main className="flex-1 p-10">

                    <h1 className="text-4xl font-bold mb-2">

                        My Jobs

                    </h1>

                    <p className="text-zinc-500 mb-8">

                        View and manage your assigned deliveries

                    </p>

                    <div
                        className="
                        bg-white
                        border
                        border-zinc-200
                        rounded-2xl
                        overflow-hidden
                        shadow-sm
                        "
                    >

                        <table className="w-full">

                            <thead className="bg-zinc-50 border-b border-zinc-200">

                                <tr className="text-left text-zinc-600">

                                    <th className="px-6 py-4 font-semibold">

                                        Route

                                    </th>

                                    <th className="px-6 py-4 font-semibold">

                                        Date

                                    </th>

                                    <th className="px-6 py-4 font-semibold">

                                        Truck

                                    </th>

                                    <th className="px-6 py-4 font-semibold">

                                        Weight

                                    </th>

                                    <th className="px-6 py-4 font-semibold">

                                        Status

                                    </th>

                                    <th className="px-6 py-4 font-semibold text-right">

                                        Action

                                    </th>

                                </tr>

                            </thead>

                            <tbody>

                                {jobs.map((job:any,index:number)=>(

                                    <tr
                                        key={job._id}
                                        className={`
                                        hover:bg-zinc-50
                                        transition

                                        ${
                                            index !== jobs.length - 1
                                            ? "border-b border-zinc-100"
                                            : ""
                                        }
                                        `}
                                    >

                                        <td className="px-6 py-5 font-medium">

                                            {job.pickupLocation}
                                            {" → "}
                                            {job.deliveryLocation}

                                            <p className="text-sm text-zinc-400 mt-1">

                                                {
                                                    job.comments?.length > 0
                                                    ? job.comments.join(", ")
                                                    : "No comments"
                                                }

                                            </p>

                                        </td>

                                        <td className="px-6 py-5 text-zinc-600 whitespace-nowrap">

                                            {
                                                job.jobDate
                                                ? new Date(job.jobDate)
                                                .toLocaleDateString("en-NZ")
                                                : "-"
                                            }

                                        </td>

                                        <td className="px-6 py-5 text-zinc-600">

                                            {job.truckType}

                                        </td>

                                        <td className="px-6 py-5 text-zinc-600">

                                            {job.weight}kg

                                        </td>

                                        <td className="px-6 py-5">

                                            <span
                                                className={`
                                                inline-block
                                                px-3
                                                py-1
                                                rounded-full
                                                text-xs
                                                font-medium

                                                ${
                                                    job.status==="PENDING"
                                                    ? "bg-[#F6AE2D]/10 text-[#B7791F]"
                                                    : ""
                                                }

                                                ${
                                                    job.status==="IN_PROGRESS"
                                                    ? "bg-[#86BBD8]/20 text-[#33658A]"
                                                    : ""
                                                }

                                                ${
                                                    job.status==="COMPLETED"
                                                    ? "bg-[#33658A]/10 text-[#2F4858]"
                                                    : ""
                                                }
                                                `}
                                            >

                                                {job.status}

                                            </span>

                                        </td>

                                        <td className="px-6 py-5 text-right">

                                            <button
                                                className={`
                                                px-4
                                                py-2
                                                rounded-xl
                                                text-sm
                                                font-medium
                                                transition

                                                ${
                                                    job.status==="COMPLETED"
                                                    ? "bg-zinc-200 text-zinc-500 cursor-not-allowed"
                                                    : "bg-[#33658A] hover:bg-[#2F4858] text-white"
                                                }
                                                `}
                                                disabled={job.status==="COMPLETED"}
                                                onClick={()=>updateStatus(job)}
                                            >

                                                {
                                                    job.status==="PENDING"
                                                    ? "Start Job"
                                                    : ""
                                                }

                                                {
                                                    job.status==="IN_PROGRESS"
                                                    ? "Complete Job"
                                                    : ""
                                                }

                                                {
                                                    job.status==="COMPLETED"
                                                    ? "Completed"
                                                    : ""
                                                }

                                            </button>

                                        </td>

                                    </tr>

                                ))}

                                {jobs.length===0 && (

                                    <tr>

                                        <td
                                            colSpan={6}
                                            className="
                                            text-center
                                            py-16
                                            text-zinc-500
                                            "
                                        >

                                            No jobs assigned

                                        </td>

                                    </tr>

                                )}

                            </tbody>

                        </table>

                    </div>

                </main>

            </div>

        </ProtectedRoute>

    );

}
