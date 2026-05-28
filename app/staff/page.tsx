
"use client";

import ProtectedRoute from "@/components/ProtectedRoute";
import Sidebar from "@/components/Sidebar";
import { useEffect, useState } from "react";

export default function DriversPage(){

    const [users,setUsers] = useState<any[]>([]);

    const [name,setName] = useState("");
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [role,setRole] = useState("DRIVER");
    const [editingUser,setEditingUser] = useState<any>(null);


async function saveUser(){

    const method = editingUser
        ? "PUT"
        : "POST";

    const url = editingUser
        ? `/api/users/${editingUser._id}`
        : "/api/users";

    await fetch(url,{

        method,

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

    setName("");
    setEmail("");
    setPassword("");
    setRole("DRIVER");

    setEditingUser(null);

    loadUsers();

}

function editUser(user:any){

    setEditingUser(user);

    setName(user.name || "");
    setEmail(user.email || "");
    setPassword("");
    setRole(user.role || "DRIVER");

    window.scrollTo({
        top:0,
        behavior:"smooth"
    });

}

async function deleteUser(id:string){

    const confirmed = window.confirm(
        "Delete this user?"
    );

    if(!confirmed)
        return;

    await fetch(`/api/users/${id}`,{

        method:"DELETE"

    });

    loadUsers();

}




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

            <div className="flex bg-zinc-100 min-h-screen">

                <Sidebar />

                <main className="flex-1 p-10">

                    <h1 className="text-4xl font-bold mb-2">

                        Staff Management

                    </h1>

                    <p className="text-zinc-500 mb-10">

                        Manage drivers and dispatch staff

                    </p>

                    {/* CREATE / EDIT USER */}

                    <div
                        className="
                        bg-white
                        border
                        border-zinc-200
                        rounded-2xl
                        p-6
                        shadow-sm
                        mb-10
                        max-w-3xl
                        "
                    >

                        <h2 className="text-2xl font-semibold mb-2">

                            {
                                editingUser
                                ? "Edit User"
                                : "Create User"
                            }

                        </h2>

                        <p className="text-zinc-500 mb-6">

                            Add or manage staff accounts

                        </p>

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
                                placeholder="Name"
                                value={name}
                                onChange={(e)=>setName(e.target.value)}
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
                                placeholder="Email"
                                value={email}
                                onChange={(e)=>setEmail(e.target.value)}
                            />

                            <input
                                type="password"
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
                                placeholder={
                                    editingUser
                                    ? "New Password (optional)"
                                    : "Password"
                                }
                                value={password}
                                onChange={(e)=>setPassword(e.target.value)}
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

                        </div>

                        <div className="flex gap-3 mt-6">

                            <button
                                className="
                                bg-[#33658A]
                                hover:bg-[#2F4858]
                                text-white
                                font-medium
                                rounded-xl
                                px-6
                                py-3
                                transition
                                "
                                onClick={saveUser}
                            >

                                {
                                    editingUser
                                    ? "Save Changes"
                                    : "Create User"
                                }

                            </button>

                            {editingUser && (

                                <button
                                    className="
                                    border
                                    border-zinc-300
                                    hover:bg-zinc-100
                                    rounded-xl
                                    px-6
                                    py-3
                                    transition
                                    "
                                    onClick={()=>{

                                        setEditingUser(null);

                                        setName("");
                                        setEmail("");
                                        setPassword("");
                                        setRole("DRIVER");

                                    }}
                                >

                                    Cancel

                                </button>

                            )}

                        </div>

                    </div>

                    {/* STAFF LISTS */}

                    <div className="grid grid-cols-1 xl:grid-cols-2 gap-10">

                        {/* DRIVERS */}

                        <div>

                            <h2 className="text-2xl font-semibold mb-6">

                                Drivers

                            </h2>

                            <div className="space-y-4">

                                {users
                                .filter(
                                    (u:any)=>
                                    u.role==="DRIVER"
                                )
                                .map((user:any)=>(

                                    <div
                                        key={user._id}
                                        className="
                                        bg-white
                                        border
                                        border-zinc-200
                                        rounded-2xl
                                        p-5
                                        shadow-sm
                                        hover:shadow-md
                                        transition
                                        "
                                    >

                                        <div className="flex items-center justify-between mb-3">

                                            <h2 className="font-semibold text-lg">

                                                {user.name}

                                            </h2>

                                            <span
                                                className="
                                                bg-blue-100
                                                text-blue-700
                                                px-3
                                                py-1
                                                rounded-full
                                                text-xs
                                                font-medium
                                                "
                                            >

                                                DRIVER

                                            </span>

                                        </div>

                                        <p className="text-zinc-600">

                                            {user.email}

                                        </p>

                                        <div className="flex gap-2 mt-4">

                                            <button
                                                className="
                                                bg-[#33658A]
                                                hover:bg-[#2F4858]
                                                text-white
                                                px-4
                                                py-2
                                                rounded-lg
                                                text-sm
                                                transition
                                                "
                                                onClick={()=>editUser(user)}
                                            >

                                                Edit

                                            </button>

                                            <button
                                                className="
                                                bg-red-500
                                                hover:bg-red-600
                                                text-white
                                                px-4
                                                py-2
                                                rounded-lg
                                                text-sm
                                                transition
                                                "
                                                onClick={()=>deleteUser(user._id)}
                                            >

                                                Delete

                                            </button>

                                        </div>

                                    </div>

                                ))}

                            </div>

                        </div>

                        {/* DISPATCHERS */}

                        <div>

                            <h2 className="text-2xl font-semibold mb-6">

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
                                        className="
                                        bg-white
                                        border
                                        border-zinc-200
                                        rounded-2xl
                                        p-5
                                        shadow-sm
                                        hover:shadow-md
                                        transition
                                        "
                                    >

                                        <div className="flex items-center justify-between mb-3">

                                            <h2 className="font-semibold text-lg">

                                                {user.name}

                                            </h2>

                                            <span
                                                className="
                                                bg-orange-100
                                                text-orange-700
                                                px-3
                                                py-1
                                                rounded-full
                                                text-xs
                                                font-medium
                                                "
                                            >

                                                DISPATCHER

                                            </span>

                                        </div>

                                        <p className="text-zinc-600">

                                            {user.email}

                                        </p>

                                        <div className="flex gap-2 mt-4">

                                            <button
                                                className="
                                                bg-[#33658A]
                                                hover:bg-[#2F4858]
                                                text-white
                                                px-4
                                                py-2
                                                rounded-lg
                                                text-sm
                                                transition
                                                "
                                                onClick={()=>editUser(user)}
                                            >

                                                Edit

                                            </button>

                                            <button
                                                className="
                                                bg-red-500
                                                hover:bg-red-600
                                                text-white
                                                px-4
                                                py-2
                                                rounded-lg
                                                text-sm
                                                transition
                                                "
                                                onClick={()=>deleteUser(user._id)}
                                            >

                                                Delete

                                            </button>

                                        </div>

                                    </div>

                                ))}

                            </div>

                        </div>

                    </div>

                </main>

            </div>

        </ProtectedRoute>

    )



}
