"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import {
    LayoutDashboard,
    Truck,
    Users,
    CalendarDays,
    LogOut
} from "lucide-react";

export default function Sidebar() {

    const [role,setRole] = useState("");

    useEffect(()=>{

        const storedRole =
            localStorage.getItem("role");

        if(storedRole){

            setRole(storedRole);

        }

    },[]);

    return (

        <aside
            className="
            w-72
h-screen
sticky
top-0
bg-[#2F4858]
            text-white
            p-6
            flex
            flex-col
            "
        >

            <h1 className="text-3xl font-bold mb-10">

                TruckTruck

            </h1>

            <nav className="flex flex-col gap-3">

                <Link
                   href={
                           role==="ADMIN"
                           ? "/admin"
                           : "/dispatcher"
                       }
                    className="
                    flex
                    items-center
                    gap-3
                    p-3
                    rounded-xl
                    hover:bg-[#33658A]
                    transition
                    "
                >

                    <LayoutDashboard size={20} />

                    Dashboard

                </Link>

                <Link
                    href="/jobs"
                    className="
                    flex
                    items-center
                    gap-3
                    p-3
                    rounded-xl
                    hover:bg-[#33658A]
                    transition
                    "
                >

                    <Truck size={20} />

                    Jobs

                </Link>

                <Link
                    href="/schedule"
                    className="
                    flex
                    items-center
                    gap-3
                    px-4
                    py-3
                    rounded-xl
                    hover:bg-white/10
                    transition
                    "
                >

                    <CalendarDays size={20} />

                    Schedule

                </Link>



                {
                    role==="ADMIN" && (

                        <Link
                            href="/staff"
                            className="
                            flex
                            items-center
                            gap-3
                            p-3
                            rounded-xl
                            hover:bg-[#33658A]
                            transition
                            "
                        >

                            <Users size={20} />

                            Staff

                        </Link>

                    )
                }

            </nav>

            <button
                className="
                mt-auto
                flex
                items-center
                gap-3
                p-3
                rounded-xl
                hover:bg-[#F26419]
                transition
                "
                onClick={() => {

                    localStorage.removeItem("token");
                    localStorage.removeItem("role");

                    window.location.href = "/login";

                }}
            >

                <LogOut size={20} />

                Logout

            </button>


        </aside>

    );

}

