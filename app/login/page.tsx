"use client";

import { useState } from "react";

export default function Login(){

    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");

    async function handleLogin(){

        const response =
            await fetch("/api/login",{

                method:"POST",

                headers:{
                    "Content-Type":"application/json"
                },

                body:JSON.stringify({

                    email,
                    password

                })

            });

        const data = await response.json();

        console.log(data);

        if(response.ok){

            localStorage.setItem(
                "email",
                email
            );

            localStorage.setItem(
                "role",
                data.role
            );

            localStorage.setItem(
                "name",
                data.name
            );

            if(data.role==="ADMIN"){

                window.location.href="/admin";

            }

            else if(data.role==="DISPATCHER"){

                window.location.href="/dispatcher";

            }

            else if(data.role==="DRIVER"){

                window.location.href="/driver";

            }

        }
        else{

            alert(data.message);

        }

    }

    return(

        <main className="min-h-screen flex items-center justify-center">

            <div className="border rounded-xl p-8 w-96">

                <h1 className="text-3xl font-bold mb-6">

                    TruckTruck Login

                </h1>

                <input
                    className="border p-2 w-full mb-4 rounded"
                    placeholder="Email"
                    value={email}
                    onChange={(e)=>setEmail(e.target.value)}
                />

                <input
                    type="password"
                    className="border p-2 w-full mb-4 rounded"
                    placeholder="Password"
                    value={password}
                    onChange={(e)=>setPassword(e.target.value)}
                />

                <button
                    className="border px-4 py-2 rounded w-full"
                    onClick={handleLogin}
                >
                    Login
                </button>

            </div>

        </main>

    );

}