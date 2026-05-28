"use client";

import ProtectedRoute from "@/components/ProtectedRoute";
import Sidebar from "@/components/Sidebar";
import { useEffect, useState } from "react";

export default function JobsPage() {

    const [pickup, setPickup] = useState("");
    const [delivery, setDelivery] = useState("");
    const [jobDate, setJobDate] = useState("");
    const [weight, setWeight] = useState("");
    const [truckType, setTruckType] = useState("TRUCK");
    const [comments, setComments] = useState("");

    const [drivers, setDrivers] = useState<any[]>([]);
    const [selectedDriver, setSelectedDriver] = useState("");

    const [statusFilter,setStatusFilter] = useState("ALL");
    const [driverFilter,setDriverFilter] = useState("ALL");
    const [dateFilter,setDateFilter] = useState("");

    const [editingJob,setEditingJob] = useState<any>(null);



    const [jobs, setJobs] = useState<any[]>([]);

    async function loadJobs() {

        const response = await fetch("/api/jobs");

        const data = await response.json();

        setJobs(data);

    }

    async function loadDrivers() {

        const response = await fetch("/api/users");

        const data = await response.json();

        const driverUsers = data.filter(
            (u:any)=>u.role==="DRIVER"
        );

        setDrivers(driverUsers);

    }



function editJob(job:any){

    setEditingJob(job);

    setPickup(job.pickupLocation || "");
    setDelivery(job.deliveryLocation || "");
    setJobDate(job.jobDate || "");
    setWeight(job.weight || "");
    setTruckType(job.truckType || "TRUCK");

    setComments(
        job.comments?.join(", ") || ""
    );

    setSelectedDriver(
        job.driverId?._id || ""
    );

    window.scrollTo({
        top:0,
        behavior:"smooth"
    });

}

    async function saveJob() {


        const method = editingJob
            ? "PUT"
            : "POST";

        const url = editingJob
            ? `/api/jobs/${editingJob._id}`
            : "/api/jobs";



        await fetch(url,{

            method,

            headers:{
                "Content-Type":"application/json"
            },

            body: JSON.stringify({

                pickupLocation: pickup,
                deliveryLocation: delivery,
                jobDate,
                weight,
                truckType,
                comments:[comments],
                driverId:selectedDriver

            })

        });


        setPickup("");
        setDelivery("");
        setJobDate("");
        setWeight("");
        setTruckType("TRUCK");
        setComments("");
        setSelectedDriver("");
        setEditingJob(null);

        loadJobs();

    }

    async function updateStatus(job:any){

        let newStatus="PENDING";

        if(job.status==="PENDING")
            newStatus="IN_PROGRESS";

        else if(job.status==="IN_PROGRESS")
            newStatus="COMPLETED";

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
        loadDrivers();

    },[]);

const filteredJobs = jobs.filter((job:any)=>{

    const matchesStatus =

        statusFilter==="ALL"
        || job.status===statusFilter;

    const matchesDriver =

        driverFilter==="ALL"
        || job.driverId?._id===driverFilter;

    const matchesDate =

        dateFilter===""
        || job.jobDate===dateFilter;

    return (
        matchesStatus
        && matchesDriver
        && matchesDate
    );

});



    return(

        <ProtectedRoute
            allowedRoles={["ADMIN", "DISPATCHER"]}
        >

            <div className="flex bg-zinc-100 min-h-screen">

                <Sidebar />

                <main className="flex-1 p-10">

                    <h1 className="text-4xl font-bold mb-2">

                        Jobs

                    </h1>

                    <p className="text-zinc-500 mb-8">

                        Create and manage transport jobs

                    </p>

                    <div
                        className="
                        bg-white
                        rounded-2xl
                        shadow-sm
                        border
                        border-zinc-200
                        p-6
                        mb-10
                        max-w-2xl
                        "
                    >

                        <h2 className="text-2xl font-semibold mb-6">

                            {
                                editingJob
                                ? "Update Job"
                                : "Create Job"
                            }



                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                            <input
                                className="
                                border
                                border-zinc-300
                                rounded-xl
                                p-3
                                bg-white
                                focus:outline-none
                                focus:ring-2
                                focus:ring-[#33658A]
                                transition
                                "
                                placeholder="Pickup"
                                value={pickup}
                                onChange={(e)=>setPickup(e.target.value)}
                            />

                            <input
                                className="
                                border
                                border-zinc-300
                                rounded-xl
                                p-3
                                bg-white
                                focus:outline-none
                                focus:ring-2
                                focus:ring-[#33658A]
                                transition
                                "
                                placeholder="Delivery"
                                value={delivery}
                                onChange={(e)=>setDelivery(e.target.value)}
                            />

                            <input
                                type="date"
                                className="
                                border
                                border-zinc-300
                                rounded-xl
                                p-3
                                bg-white
                                focus:outline-none
                                focus:ring-2
                                focus:ring-[#33658A]
                                transition
                                "
                                value={jobDate}
                                onChange={(e)=>setJobDate(e.target.value)}
                            />

                            <input
                                className="
                                border
                                border-zinc-300
                                rounded-xl
                                p-3
                                bg-white
                                focus:outline-none
                                focus:ring-2
                                focus:ring-[#33658A]
                                transition
                                "
                                placeholder="Weight (kg)"
                                value={weight}
                                onChange={(e)=>setWeight(e.target.value)}
                            />

                            <select
                                className="
                                border
                                border-zinc-300
                                rounded-xl
                                p-3
                                bg-white
                                focus:outline-none
                                focus:ring-2
                                focus:ring-[#33658A]
                                transition
                                "
                                value={truckType}
                                onChange={(e)=>setTruckType(e.target.value)}
                            >

                                <option value="TRUCK">TRUCK</option>
                                <option value="HIAB">HIAB</option>
                                <option value="TRUCK_TRAILER">TRUCK TRAILER</option>

                            </select>

                            <select
                                className="
                                border
                                border-zinc-300
                                rounded-xl
                                p-3
                                bg-white
                                focus:outline-none
                                focus:ring-2
                                focus:ring-[#33658A]
                                transition
                                "
                                value={selectedDriver}
                                onChange={(e)=>setSelectedDriver(e.target.value)}
                            >

                                <option value="">

                                    Assign Driver

                                </option>

                                {drivers.map((driver:any)=>(

                                    <option
                                        key={driver._id}
                                        value={driver._id}
                                    >

                                        {driver.name}

                                    </option>

                                ))}

                            </select>

                        </div>

                        <textarea
                            className="
                            border
                            border-zinc-300
                            rounded-xl
                            p-3
                            bg-white
                            focus:outline-none
                            focus:ring-2
                            focus:ring-[#33658A]
                            transition
                            w-full
                            mt-4
                            "
                            placeholder="Comments"
                            value={comments}
                            onChange={(e)=>setComments(e.target.value)}
                        />

                        <button
                            className="
                            bg-[#33658A]
                            hover:bg-[#2F4858]
                            text-white
                            font-medium
                            rounded-xl
                            p-3
                            mt-4
                            w-full
                            transition
                            "
                            onClick={saveJob}
                        >
{ editingJob ? "Save Changes" : "Create Job" }

                        </button>

                    </div>

                    <div
                        className="
                        bg-white
                        rounded-2xl
                        shadow-sm
                        border
                        border-zinc-200
                        p-4
                        mb-6
                        flex
                        flex-wrap
                        gap-4
                        "
                    >

                        <input
                            type="date"
                            className="
                            border
                            border-zinc-300
                            rounded-xl
                            px-4
                            py-2
                            "
                            value={dateFilter}
                            onChange={(e)=>setDateFilter(e.target.value)}
                        />

                        <select
                            className="
                            border
                            border-zinc-300
                            rounded-xl
                            px-4
                            py-2
                            "
                            value={driverFilter}
                            onChange={(e)=>setDriverFilter(e.target.value)}
                        >

                            <option value="ALL">

                                All Drivers

                            </option>

                            {drivers.map((driver:any)=>(

                                <option
                                    key={driver._id}
                                    value={driver._id}
                                >

                                    {driver.name}

                                </option>

                            ))}

                        </select>

                        <select
                            className="
                            border
                            border-zinc-300
                            rounded-xl
                            px-4
                            py-2
                            "
                            value={statusFilter}
                            onChange={(e)=>setStatusFilter(e.target.value)}
                        >

                            <option value="ALL">
                                All Statuses
                            </option>

                            <option value="PENDING">
                                Pending
                            </option>

                            <option value="IN_PROGRESS">
                                In Progress
                            </option>

                            <option value="COMPLETED">
                                Completed
                            </option>

                        </select>

                    </div>




                    <h2 className="text-2xl font-semibold mb-6">

                        Dispatch Queue

                    </h2>

                    <div
                        className="
                        bg-white
                        rounded-2xl
                        shadow-sm
                        border
                        border-zinc-200
                        overflow-hidden
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

                                        Driver

                                    </th>

                                    <th className="px-6 py-4 font-semibold">

                                        Status

                                    </th>

                                    <th className="px-6 py-4 font-semibold">

                                        Truck

                                    </th>

                                    <th className="px-6 py-4 font-semibold">

                                        Actions

                                    </th>

                                </tr>

                            </thead>

                            <tbody>

                                {filteredJobs.map((job:any)=>(

                                    <tr
                                        key={job._id}
                                        className="
                                        border-b
                                        border-zinc-100
                                        hover:bg-zinc-50
                                        transition
                                        "
                                    >

                                        <td className="px-6 py-4 font-medium">

                                            {job.pickupLocation}
                                            {" → "}
                                            {job.deliveryLocation}

                                        </td>

                                        <td className="px-6 py-4 text-zinc-600">

{ job.jobDate ? new Date(job.jobDate).toLocaleDateString("en-NZ") : "-" }
                                        </td>

                                        <td className="px-6 py-4 text-zinc-600">

                                            {job.driverId?.name || "Unassigned"}

                                        </td>

                                        <td className="px-6 py-4">

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
                                                    ? "bg-yellow-100 text-yellow-700"
                                                    : ""
                                                }

                                                ${
                                                    job.status==="IN_PROGRESS"
                                                    ? "bg-blue-100 text-blue-700"
                                                    : ""
                                                }

                                                ${
                                                    job.status==="COMPLETED"
                                                    ? "bg-green-100 text-green-700"
                                                    : ""
                                                }
                                                `}
                                            >

                                                {job.status}

                                            </span>

                                        </td>

                                        <td className="px-6 py-4 text-zinc-600">

                                            {job.truckType}

                                        </td>

                                        <td className="px-6 py-4">


                                            <div className="flex items-center gap-2">

                                                <button
                                                    className={`
                                                    px-4
                                                    py-2
                                                    rounded-lg
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

                                                <button
                                                    className="
                                                    px-4
                                                    py-2
                                                    rounded-lg
                                                    text-sm
                                                    border
                                                    border-zinc-300
                                                    hover:bg-zinc-100
                                                    transition

                                                    "
                                                                                                        onClick={()=>editJob(job)}

                                                >

Edit

                                                </button>

                                            </div>



                                        </td>

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