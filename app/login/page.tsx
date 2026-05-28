"use client";

import { useState } from "react";
import { Truck } from "lucide-react";

export default function Login(){

    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");

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

        <main
            className="
            min-h-screen
            flex
            items-center
            justify-center
            bg-zinc-100
            px-6
            "
        >

            <div
                className="
                w-full
                max-w-md
                bg-white
                border
                border-zinc-200
                rounded-3xl
                shadow-sm
                p-10
                "
            >

                <div className="flex items-center gap-4 mb-8">

                    <div
                        className="
                        bg-[#33658A]/10
                        p-4
                        rounded-2xl
                        "
                    >

                        <Truck
                            size={32}
                            className="text-[#33658A]"
                        />

                    </div>

                    <div>

                        <h1 className="text-3xl font-bold text-[#2F4858]">

                            TruckTruck

                        </h1>

                        <p className="text-zinc-500">

                            Transport Management System

                        </p>

                    </div>

                </div>

                <div className="space-y-5">

                    <div>

                        <label
                            className="
                            text-sm
                            font-medium
                            text-zinc-600
                            mb-2
                            block
                            "
                        >

                            Email

                        </label>

                        <input
                            className="
                            w-full
                            border
                            border-zinc-300
                            rounded-xl
                            p-3
                            bg-white
                            focus:outline-none
                            focus:ring-2
                            focus:ring-[#86BBD8]
                            transition
                            "
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e)=>setEmail(e.target.value)}
                        />

                    </div>

                    <div>

                        <label
                            className="
                            text-sm
                            font-medium
                            text-zinc-600
                            mb-2
                            block
                            "
                        >

                            Password

                        </label>

                        <input
                            type="password"
                            className="
                            w-full
                            border
                            border-zinc-300
                            rounded-xl
                            p-3
                            bg-white
                            focus:outline-none
                            focus:ring-2
                            focus:ring-[#86BBD8]
                            transition
                            "
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e)=>setPassword(e.target.value)}
                        />

                    </div>

                    <button
                        className="
                        w-full
                        bg-[#33658A]
                        hover:bg-[#2F4858]
                        text-white
                        font-medium
                        rounded-xl
                        p-3
                        transition
                        "
                        onClick={handleLogin}
                    >

                        Login

                    </button>

                </div>

            </div>

        </main>

    );

}
