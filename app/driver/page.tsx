"use client";

import Navbar from "@/components/Navbar";
import ProtectedRoute from "@/components/ProtectedRoute";
import { useEffect,useState } from "react";

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

    },[]);

    return(
        <ProtectedRoute
        allowedRoles={["DRIVER"]}
        >

        <main className="min-h-screen">

            <Navbar/>

            <div className="p-8">

                <h1 className="text-4xl font-bold mb-8">

                    My Jobs

                </h1>

                <div className="space-y-4">

                    {jobs.map((job:any)=>(

                        <div
                            key={job._id}
                            className="border rounded-xl p-4"
                        >

                            <h2>

                                {job.pickupLocation}
                                {" → "}
                                {job.deliveryLocation}

                            </h2>

                            <p>Date: {job.jobDate}</p>

                            <p>Weight: {job.weight}kg</p>

                            <p>Truck: {job.truckType}</p>

                            <p>

                                Comments:
                                {" "}
                                {job.comments?.join(", ")}

                            </p>

                            <p>

                                Status:
                                {" "}
                                {job.status}

                            </p>

                            <button
                                className="border px-4 py-2 rounded mt-3"
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