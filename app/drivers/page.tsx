"use client";

import Navbar from "@/components/Navbar";
import ProtectedRoute from "@/components/ProtectedRoute";
import { useEffect,useState } from "react";

export default function DriversPage(){

    const [users,setUsers] = useState<any[]>([]);

    async function loadUsers(){

        const response =
            await fetch("/api/users");

        const data =
            await response.json();

        setUsers(data);

    }

    useEffect(()=>{

        loadUsers();

    },[]);

    return(

        <ProtectedRoute
            allowedRoles={["ADMIN","DISPATCHER"]}
        >

        <main className="min-h-screen">

            <Navbar/>

            <div className="p-8">

                <h1 className="text-4xl font-bold mb-8">

                    Staff

                </h1>

                <h2 className="text-2xl font-bold mb-4">

                    Drivers

                </h2>

                <div className="space-y-4 mb-10">

                    {users
                    .filter(
                        (u:any)=>
                        u.role==="DRIVER"
                    )
                    .map((user:any)=>(

                        <div
                            key={user._id}
                            className="border rounded-xl p-4"
                        >

                            <h2 className="font-bold">

                                {user.name}

                            </h2>

                            <p>

                                {user.email}

                            </p>

                        </div>

                    ))}

                </div>

                <h2 className="text-2xl font-bold mb-4">

                    Dispatchers

                </h2>

                <div className="space-y-4">

                    {users
                    .filter(
                        (u:any)=>
                        u.role==="DISPATCHER"
                    )
                    .map((user:any)=>(

                        <div
                            key={user._id}
                            className="border rounded-xl p-4"
                        >

                            <h2 className="font-bold">

                                {user.name}

                            </h2>

                            <p>

                                {user.email}

                            </p>

                        </div>

                    ))}

                </div>

            </div>

        </main>

        </ProtectedRoute>

    )

}