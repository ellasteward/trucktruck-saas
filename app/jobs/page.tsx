"use client";

import Navbar from "@/components/Navbar";
import ProtectedRoute from "@/components/ProtectedRoute";
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

    async function createJob() {

        await fetch("/api/jobs",{

            method:"POST",

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

    return(

        <ProtectedRoute
                allowedRoles={["ADMIN", "DISPATCHER"]}
            >

    <main className="min-h-screen">

        <Navbar/>

        <div className="p-8">
            <h1 className="text-4xl font-bold mb-8">

                Jobs

            </h1>

            <div className="border rounded-xl p-6 mb-10 max-w-3xl">

                <h2 className="text-2xl font-bold mb-6">

                    Create Job

                </h2>

                <div className="grid grid-cols-2 gap-4">

                    <input
                        className="border p-3 rounded"
                        placeholder="Pickup"
                        value={pickup}
                        onChange={(e)=>setPickup(e.target.value)}
                    />

                    <input
                        className="border p-3 rounded"
                        placeholder="Delivery"
                        value={delivery}
                        onChange={(e)=>setDelivery(e.target.value)}
                    />

                    <input
                        type="date"
                        className="border p-3 rounded"
                        value={jobDate}
                        onChange={(e)=>setJobDate(e.target.value)}
                    />

                    <input
                        className="border p-3 rounded"
                        placeholder="Weight (kg)"
                        value={weight}
                        onChange={(e)=>setWeight(e.target.value)}
                    />

                    <select
                        className="border p-3 rounded"
                        value={truckType}
                        onChange={(e)=>setTruckType(e.target.value)}
                    >

                        <option value="TRUCK">TRUCK</option>
                        <option value="HIAB">HIAB</option>
                        <option value="TRUCK_TRAILER">TRUCK TRAILER</option>

                    </select>

                    <select
                        className="border p-3 rounded"
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
                    className="border p-3 rounded w-full mt-4"
                    placeholder="Comments"
                    value={comments}
                    onChange={(e)=>setComments(e.target.value)}
                />

                <button
                    className="border rounded p-3 mt-4 w-full"
                    onClick={createJob}
                >

                    Create Job

                </button>

            </div>

            <h2 className="text-2xl font-bold mb-4">

                All Jobs

            </h2>

            <div className="space-y-4">

                {jobs.map((job:any)=>(

                    <div
                        key={job._id}
                        className="border rounded-xl p-4"
                    >

                        <h2 className="font-bold text-lg">

                            {job.pickupLocation}
                            {" → "}
                            {job.deliveryLocation}

                        </h2>

                        <p>Date: {job.jobDate}</p>

                        <p>Weight: {job.weight}kg</p>

                        <p>Truck: {job.truckType}</p>

                        <p>
                            Driver:
                            {" "}
                            {job.driverId?.name || "Unassigned"}
                        </p>

                        <p>
                            Comments:
                            {" "}
                            {job.comments?.join(", ")}
                        </p>

                        <p className="mb-4">

                            Status: {job.status}

                        </p>

                        <button
                            className="border rounded px-4 py-2"
                            onClick={()=>updateStatus(job)}
                        >

                            {job.status==="PENDING" && "Start Job"}
                            {job.status==="IN_PROGRESS" && "Complete Job"}
                            {job.status==="COMPLETED" && "Finished"}

                        </button>

                    </div>

                ))}

            </div>

              </div>

          </main>
          </ProtectedRoute>


          )

      }