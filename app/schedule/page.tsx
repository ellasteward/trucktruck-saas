"use client";

import ProtectedRoute from "@/components/ProtectedRoute";
import Sidebar from "@/components/Sidebar";
import DriverSidebar from "@/components/DriverSidebar";
import { useEffect, useState } from "react";

export default function SchedulePage(){

    const [jobs,setJobs] = useState<any[]>([]);
    const [currentWeek,setCurrentWeek] = useState(
        new Date()
    );
const role =
    typeof window !== "undefined"
    ? localStorage.getItem("role")
    : null;

function handleWeekChange(
    e:any
){

    setCurrentWeek(
        new Date(e.target.value)
    );

}



    async function loadJobs(){

        const response = await fetch("/api/jobs");

        const data = await response.json();

        setJobs(data);

    }

    useEffect(()=>{

        loadJobs();

    },[]);

const startOfWeek = new Date(currentWeek);

startOfWeek.setDate(
    currentWeek.getDate()
    - currentWeek.getDay()
    + 1
);

const weekDates = Array.from(
    { length: 5 },
    (_,i)=>{

        const date = new Date(startOfWeek);

        date.setDate(startOfWeek.getDate() + i);

        return date;

    }
);


    const groupedJobs:any = {};

    jobs.forEach((job:any)=>{

        const date = job.jobDate || "No Date";

        if(!groupedJobs[date]){

            groupedJobs[date] = [];

        }

        groupedJobs[date].push(job);

    });

    return(

        <ProtectedRoute
            allowedRoles={["ADMIN","DISPATCHER","DRIVER"]}
        >

            <div className="flex bg-zinc-100 min-h-screen">

                {
                    role==="DRIVER"
                    ? <DriverSidebar />
                    : <Sidebar />
                }

                <main className="flex-1 p-10 overflow-x-auto">

                    <h1 className="text-4xl font-bold mb-2">

                        Weekly Schedule

                    </h1>

                    <p className="text-zinc-500 mb-10">

                        Driver dispatch planning board

                    </p>



<div className="flex items-center justify-between mb-6">

    <div>

        <h2 className="text-2xl font-semibold">

            Dispatch Schedule

        </h2>

        <p className="text-zinc-500">

            Weekly operational overview

        </p>

    </div>

    <div className="flex items-center gap-3">

        <button
            className="
            border
            border-zinc-300
            rounded-xl
            px-4
            py-2
            hover:bg-zinc-100
            transition
            "
            onClick={()=>{

                const prev =
                    new Date(currentWeek);

                prev.setDate(
                    prev.getDate()-7
                );

                setCurrentWeek(prev);

            }}
        >

            Previous

        </button>

        <input
            type="date"
            className="
            border
            border-zinc-300
            rounded-xl
            px-4
            py-2
            bg-white
            "
            value={
                currentWeek
                .toISOString()
                .split("T")[0]
            }
            onChange={handleWeekChange}
        />

        <button
            className="
            border
            border-zinc-300
            rounded-xl
            px-4
            py-2
            hover:bg-zinc-100
            transition
            "
            onClick={()=>{

                const next =
                    new Date(currentWeek);

                next.setDate(
                    next.getDate()+7
                );

                setCurrentWeek(next);

            }}
        >

            Next

        </button>

    </div>

</div>

                    <div
                        className="
                        bg-white
                        border
                        border-zinc-200
                        rounded-2xl
                        shadow-sm
                        overflow-hidden
                        min-w-[1200px]
                        "
                    >

                        <table className="w-full">

                            <thead className="bg-zinc-50 border-b border-zinc-200">

                                <tr>

                                    <th className="text-left p-4 w-64">

                                        Driver

                                    </th>

                                    {weekDates.map((date)=>(

                                        <th
                                            key={date.toISOString()}
                                            className="text-left p-4"
                                        >

                                            <div className="font-semibold">

                                                {
                                                    date.toLocaleDateString(
                                                        "en-NZ",
                                                        {
                                                            weekday:"short"
                                                        }
                                                    )
                                                }

                                            </div>

                                            <div className="text-sm text-zinc-500 font-normal">

                                                {
                                                    date.toLocaleDateString(
                                                        "en-NZ",
                                                        {
                                                            day:"numeric",
                                                            month:"short"
                                                        }
                                                    )
                                                }

                                            </div>

                                        </th>

                                    ))}


                                </tr>

                            </thead>

                            <tbody>

                                {
                                 Array.from(
                                     new Map(
                                         jobs
                                         .filter((j:any)=>j.driverId)
                                         .map(
                                             (j:any)=>[
                                                 j.driverId._id,
                                                 j.driverId
                                             ]
                                         )
                                     ).values()
                                 ).map((driver:any)=>(

                                    <tr
                                        key={driver?._id}
                                        className="
                                        border-b
                                        border-zinc-100
                                        align-top
                                        "
                                    >

                                        <td className="p-4 font-semibold">

                                            {driver?.name || "Unassigned"}

                                        </td>

                                        {[1,2,3,4,5].map((day)=>(

                                            <td
                                                key={day}
                                                className="
                                                p-3
                                                border-l
                                                border-zinc-100
                                                min-w-[220px]
                                                "
                                            >

                                                <div className="space-y-3">

                                                    {jobs
                                                    .filter((job:any)=>{

                                                        if(!job.jobDate)
                                                            return false;

                                                        const jobDate = new Date(job.jobDate);

                                                        const cellDate = weekDates[day-1];

                                                        return (

                                                            job.driverId?._id===driver?._id

                                                            &&

                                                            jobDate.toDateString()
                                                            ===
                                                            cellDate.toDateString()

                                                        );


                                                    })
                                                    .map((job:any)=>(

                                                        <div
                                                            key={job._id}
                                                            className={`
                                                            rounded-xl
                                                            p-3
                                                            text-sm
                                                            border

                                                            ${
                                                                job.status==="PENDING"
                                                                ? "bg-[#F6AE2D]/10 border-[#F6AE2D]/30"
                                                                : ""
                                                            }

                                                            ${
                                                                job.status==="IN_PROGRESS"
                                                                ? "bg-[#86BBD8]/20 border-[#86BBD8]"
                                                                : ""
                                                            }

                                                            ${
                                                                job.status==="COMPLETED"
                                                                ? "bg-green-50 border-green-200"
                                                                : ""
                                                            }
                                                            `}
                                                        >

                                                            <p className="font-semibold">

                                                                {job.pickupLocation}
                                                                {" → "}
                                                                {job.deliveryLocation}

                                                            </p>

                                                            <p className="text-zinc-600 mt-1">

                                                                {job.truckType}
                                                                {" • "}
                                                                {job.weight}kg

                                                            </p>

                                                            <p
                                                                className="
                                                                text-xs
                                                                mt-2
                                                                font-medium
                                                                "
                                                            >

                                                                {job.status}

                                                            </p>

                                                        </div>

                                                    ))}

                                                </div>

                                            </td>

                                        ))}

                                    </tr>

                                ))}

                            </tbody>

                        </table>

                    </div>

                </main>

            </div>

        </ProtectedRoute>

    )


}
