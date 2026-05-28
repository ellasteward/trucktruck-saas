"use client";

import Navbar from "@/components/Navbar";
import Link from "next/link";
import ProtectedRoute from "@/components/ProtectedRoute";
import Sidebar from "@/components/Sidebar";
import DashboardCard from "@/components/DashboardCard";
import { useEffect, useState } from "react";
export default function AdminPage(){

    const [name,setName]=useState("");
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const [role,setRole]=useState("DRIVER");

    const [jobs,setJobs] = useState([]);
    const [users,setUsers] = useState([]);


async function loadJobs(){

    const response = await fetch("/api/jobs");
    const data = await response.json();

    setJobs(data);

}

async function loadUsers(){

    const response = await fetch("/api/users");
    const data = await response.json();

    setUsers(data);

}

useEffect(() => {

    loadJobs();
    loadUsers();

},[]);


const totalJobs = jobs.length;

const totalDrivers = users.filter(
    (u:any)=>u.role==="DRIVER"
).length;

const pendingJobs = jobs.filter(
    (j:any)=>j.status==="PENDING"
).length;


    async function createUser(){

        await fetch("/api/users",{

            method:"POST",

            headers:{
                "Content-Type":"application/json"
            },

            body:JSON.stringify({

                name,
                email,
                password,
                role

            })

        });

        alert("User created");

        setName("");
        setEmail("");
        setPassword("");

    }

    return(

        <ProtectedRoute
        allowedRoles={["ADMIN"]}
        >

        <div className="flex bg-zinc-100 min-h-screen">

            <Sidebar />

            <main className="flex-1 p-10">



                <h1 className="text-4xl font-bold mb-8">

                    Admin Dashboard

                </h1>

                <p className="text-zinc-500 mb-8"> Manage staff accounts and permissions </p>


                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">

                    <DashboardCard
                        title="Total Jobs"
                            value={String(totalJobs)}
                        description="Jobs currently in system"
                    />

                    <DashboardCard
                        title="Drivers"
                        value={String(totalDrivers)}
                        description="Active drivers"
                    />

                    <DashboardCard
                        title="Pending Jobs"
                        value={String(pendingJobs)}
                        description="Awaiting dispatch"
                    />

                </div>


                <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

                    {/* TODAYS SCHEDULE */}

                    <div
                        className="
                        xl:col-span-2
                        bg-white
                        border
                        border-zinc-200
                        rounded-2xl
                        p-6
                        shadow-sm
                        "
                    >

                        <div className="flex items-center justify-between mb-6">

                            <div>

                                <h2 className="text-2xl font-semibold">

                                    Today's Dispatch Schedule

                                </h2>

                                <p className="text-zinc-500">

                                    Live operational overview

                                </p>

                            </div>

                        </div>

                        <div className="space-y-4">

                            {jobs.slice(0,5).map((job:any)=>(

                                <Link
                                    key={job._id}
                                    href="/jobs"
                                    className="
                                    border
                                    border-zinc-200
                                    rounded-xl
                                    p-4
                                    flex
                                    items-center
                                    justify-between
                                    hover:bg-zinc-50
                                    hover:border-[#86BBD8]
                                    transition
                                    cursor-pointer
                                    "
                                >

                                    <div className="flex flex-col gap-2">

                                        <div className="flex items-center gap-3">

                                            <h3 className="font-semibold text-lg">

                                                {job.pickupLocation}
                                                {" → "}
                                                {job.deliveryLocation}

                                            </h3>

                                            <span
                                                className="
                                                text-xs
                                                bg-zinc-100
                                                text-zinc-500
                                                px-2
                                                py-1
                                                rounded-full
                                                "
                                            >

                                                #{job._id.slice(-5)}

                                            </span>

                                        </div>

                                        <div className="flex flex-wrap items-center gap-5 text-sm text-zinc-500">

                                            <p>

                                                Driver:
                                                {" "}
                                                <span className="text-zinc-700 font-medium">

                                                    {job.driverId?.name || "Unassigned"}

                                                </span>

                                            </p>

                                            <p>

                                                Truck:
                                                {" "}
                                                <span className="text-zinc-700 font-medium">

                                                    {job.truckType}

                                                </span>

                                            </p>

                                            <p>

                                                Weight:
                                                {" "}
                                                <span className="text-zinc-700 font-medium">

                                                    {job.weight}kg

                                                </span>

                                            </p>

                                            <p>

                                                {
                                                    job.jobDate
                                                    ? new Date(job.jobDate)
                                                    .toLocaleDateString("en-NZ")
                                                    : "-"
                                                }

                                            </p>

                                        </div>

                                    </div>

                                    <div className="flex items-center gap-4">

                                        <span
                                            className={`
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

                                        <div
                                            className="
                                            text-[#33658A]
                                            font-medium
                                            text-sm
                                            "
                                        >

                                            Open →

                                        </div>

                                    </div>

                                </Link>

                            ))}

                        </div>

                    </div>

                    {/* RIGHT SIDE */}

                    <div className="space-y-6">

                        {/* QUICK ACTIONS */}

                        <div
                            className="
                            bg-white
                            border
                            border-zinc-200
                            rounded-2xl
                            p-6
                            shadow-sm
                            "
                        >

                            <h2 className="text-xl font-semibold mb-4">

                                Quick Actions

                            </h2>

                            <div className="flex flex-col gap-3">

                                <a
                                    href="/jobs"
                                    className="
                                    bg-[#33658A]
                                    hover:bg-[#2F4858]
                                    text-white
                                    rounded-xl
                                    p-3
                                    text-center
                                    font-medium
                                    transition
                                    "
                                >

                                    Create New Job

                                </a>

                                <a
                                    href="/staff"
                                    className="
                                    border
                                    border-zinc-300
                                    hover:bg-zinc-100
                                    rounded-xl
                                    p-3
                                    text-center
                                    font-medium
                                    transition
                                    "
                                >

                                    Manage Staff

                                </a>

                            </div>

                        </div>

                        {/* PENDING JOBS */}

                        <div
                            className="
                            bg-white
                            border
                            border-zinc-200
                            rounded-2xl
                            p-6
                            shadow-sm
                            "
                        >

                            <h2 className="text-xl font-semibold mb-4">

                                Jobs Requiring Attention

                            </h2>

                            <div className="space-y-3">

                                {jobs
                                .filter((j:any)=>j.status==="PENDING")
                                .slice(0,5)
                                .map((job:any)=>(

                                    <div
                                        key={job._id}
                                        className="
                                        border
                                        border-yellow-200
                                        bg-yellow-50
                                        rounded-xl
                                        p-4
                                        "
                                    >

                                        <h3 className="font-medium">

                                            {job.pickupLocation}
                                            {" → "}
                                            {job.deliveryLocation}

                                        </h3>

                                        <p className="text-sm text-zinc-500">

                                            Awaiting dispatch

                                        </p>

                                    </div>

                                ))}

                            </div>

                        </div>

                    </div>

                </div>




        </main>
        </div>
        </ProtectedRoute>

    )

}