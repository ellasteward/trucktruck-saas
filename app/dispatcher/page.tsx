"use client";

import ProtectedRoute from "@/components/ProtectedRoute";
import Sidebar from "@/components/Sidebar";
import DashboardCard from "@/components/DashboardCard";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function DispatcherPage(){

    const [jobs,setJobs] = useState<any[]>([]);
    const [users,setUsers] = useState<any[]>([]);

    async function loadData(){

        const jobsResponse =
            await fetch("/api/jobs");

        const jobsData =
            await jobsResponse.json();

        setJobs(jobsData);

        const usersResponse =
            await fetch("/api/users");

        const usersData =
            await usersResponse.json();

        setUsers(usersData);

    }

    useEffect(()=>{

        loadData();

    },[]);

    const driverCount =
        users.filter(
            (u:any)=>
                u.role==="DRIVER"
        ).length;

    const pendingJobs =
        jobs.filter(
            (j:any)=>
                j.status==="PENDING"
        ).length;

    return(

        <ProtectedRoute
            allowedRoles={["DISPATCHER"]}
        >

            <div className="flex bg-zinc-100 min-h-screen">

                <Sidebar />

                <main className="flex-1 p-10">

                    <h1 className="text-4xl font-bold mb-2">

                        Dispatcher Dashboard

                    </h1>

                    <p className="text-zinc-500 mb-8">

                        Manage transport operations and schedules

                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">

                        <DashboardCard
                            title="Total Jobs"
                            value={jobs.length.toString()}
                            description="Transport jobs in system"
                        />

                        <DashboardCard
                            title="Drivers"
                            value={driverCount.toString()}
                            description="Available drivers"
                        />

                        <DashboardCard
                            title="Pending Jobs"
                            value={pendingJobs.toString()}
                            description="Awaiting dispatch"
                        />

                    </div>

                    <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

                        {/* LEFT */}

                        <div className="xl:col-span-2 space-y-6">

                            {/* Today's Dispatch */}

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

                                <div className="flex items-center justify-between mb-6">

                                    <div>

                                        <h2 className="text-2xl font-semibold">

                                            Today's Dispatch Schedule

                                        </h2>

                                        <p className="text-zinc-500">

                                            Live operational overview

                                        </p>

                                    </div>

                                    <Link
                                        href="/schedule"
                                        className="
                                        px-4
                                        py-2
                                        rounded-xl
                                        bg-[#33658A]
                                        text-white
                                        hover:bg-[#2F4858]
                                        transition
                                        "
                                    >

                                        Open Schedule

                                    </Link>

                                </div>

                                <div className="space-y-3">

                                    {jobs.slice(0,5).map((job:any)=>(

                                        <div
                                            key={job._id}
                                            className="
                                            flex
                                            items-center
                                            justify-between
                                            border
                                            border-zinc-200
                                            rounded-xl
                                            p-4
                                            hover:bg-zinc-50
                                            transition
                                            "
                                        >

                                            <div>

                                                <h3 className="font-semibold">

                                                    {job.pickupLocation}
                                                    {" → "}
                                                    {job.deliveryLocation}

                                                </h3>

                                                <p className="text-sm text-zinc-500">

                                                    Driver:
                                                    {" "}
                                                    {job.driverId?.name || "Unassigned"}

                                                </p>

                                            </div>

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

                                        </div>

                                    ))}

                                </div>

                            </div>

                            {/* Live Activity */}

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

                                <h2 className="text-2xl font-semibold mb-2">

                                    Operations Overview

                                </h2>

                                <p className="text-zinc-500 mb-6">

                                    Current logistics activity

                                </p>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

                                    <div
                                        className="
                                        rounded-xl
                                        bg-[#33658A]/10
                                        p-5
                                        "
                                    >

                                        <p className="text-sm text-[#33658A] mb-2">

                                            Active Deliveries

                                        </p>

                                        <h3 className="text-3xl font-bold text-[#2F4858]">

                                            {
                                                jobs.filter(
                                                    (j:any)=>
                                                        j.status==="IN_PROGRESS"
                                                ).length
                                            }

                                        </h3>

                                    </div>

                                    <div
                                        className="
                                        rounded-xl
                                        bg-[#86BBD8]/20
                                        p-5
                                        "
                                    >

                                        <p className="text-sm text-[#33658A] mb-2">

                                            Completed Today

                                        </p>

                                        <h3 className="text-3xl font-bold text-[#2F4858]">

                                            {
                                                jobs.filter(
                                                    (j:any)=>
                                                        j.status==="COMPLETED"
                                                ).length
                                            }

                                        </h3>

                                    </div>

                                    <div
                                        className="
                                        rounded-xl
                                        bg-[#F6AE2D]/10
                                        p-5
                                        "
                                    >

                                        <p className="text-sm text-[#B7791F] mb-2">

                                            Awaiting Dispatch

                                        </p>

                                        <h3 className="text-3xl font-bold text-[#B7791F]">

                                            {
                                                jobs.filter(
                                                    (j:any)=>
                                                        j.status==="PENDING"
                                                ).length
                                            }

                                        </h3>

                                    </div>

                                </div>

                            </div>

                        </div>

                        {/* RIGHT */}

                        <div className="space-y-6">

                            {/* Quick Actions */}

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

                                <h2 className="text-2xl font-semibold mb-6">

                                    Quick Actions

                                </h2>

                                <div className="flex flex-col gap-4">

                                    <Link
                                        href="/jobs"
                                        className="
                                        bg-[#33658A]
                                        hover:bg-[#2F4858]
                                        text-white
                                        rounded-xl
                                        p-4
                                        font-medium
                                        text-center
                                        transition
                                        "
                                    >

                                        Create New Job

                                    </Link>

                                    <Link
                                        href="/schedule"
                                        className="
                                        border
                                        border-zinc-300
                                        hover:bg-zinc-100
                                        rounded-xl
                                        p-4
                                        font-medium
                                        text-center
                                        transition
                                        "
                                    >

                                        View Weekly Schedule

                                    </Link>

                                </div>

                            </div>

                            {/* Attention */}

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

                                <h2 className="text-2xl font-semibold mb-6">

                                    Jobs Requiring Attention

                                </h2>

                                <div className="space-y-3">

                                    {jobs
                                    .filter(
                                        (j:any)=>
                                            j.status==="PENDING"
                                    )
                                    .slice(0,4)
                                    .map((job:any)=>(

                                        <div
                                            key={job._id}
                                            className="
                                            border
                                            border-[#F6AE2D]/40
                                            bg-[#F6AE2D]/10
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

    );

}
