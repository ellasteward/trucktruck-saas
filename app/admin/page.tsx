"use client";

import Navbar from "@/components/Navbar";
import ProtectedRoute from "@/components/ProtectedRoute";
import { useState } from "react";

export default function AdminPage(){

    const [name,setName]=useState("");
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const [role,setRole]=useState("DRIVER");


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

        <main className="min-h-screen">

            <Navbar/>

            <div className="p-8">

                <h1 className="text-4xl font-bold mb-8">

                    Admin Dashboard

                </h1>

                <div className="flex flex-col gap-4 w-96">

                    <input
                        className="border p-3 rounded"
                        placeholder="Name"
                        value={name}
                        onChange={(e)=>setName(e.target.value)}
                    />

                    <input
                        className="border p-3 rounded"
                        placeholder="Email"
                        value={email}
                        onChange={(e)=>setEmail(e.target.value)}
                    />

                    <input
                        type="password"
                        className="border p-3 rounded"
                        placeholder="Password"
                        value={password}
                        onChange={(e)=>setPassword(e.target.value)}
                    />

                    <select
                        className="border p-3 rounded"
                        value={role}
                        onChange={(e)=>setRole(e.target.value)}
                    >

                        <option value="DRIVER">
                            Driver
                        </option>

                        <option value="DISPATCHER">
                            Dispatcher
                        </option>

                    </select>

                    <button
                        className="border rounded p-3"
                        onClick={createUser}
                    >

                        Create User

                    </button>

                </div>

            </div>

        </main>
        </ProtectedRoute>

    )

}