"use client";

import { useEffect, useState } from "react";
import DashboardCard from "@/components/DashboardCard";

export default function Dashboard() {

    const [jobs,setJobs] = useState([]);

    useEffect(() => {

        fetch("/api/jobs")
        .then(r=>r.json())
        .then(data=>setJobs(data));

    },[]);

    return (

        <main className="min-h-screen p-8">

            <h1 className="text-4xl font-bold mb-8">
                TruckTruck Dashboard
            </h1>

            <div className="grid grid-cols-3 gap-6">

                <DashboardCard
                    title="Jobs"
                    description={`${jobs.length} jobs`}
                />

                <DashboardCard
                    title="Drivers"
                    description="0 drivers"
                />

                <DashboardCard
                    title="Customers"
                    description="0 customers"
                />

            </div>

        </main>

    );

}