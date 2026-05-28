"use client";

import Link from "next/link";
import { CalendarDays, ClipboardList, LogOut } from "lucide-react";

export default function DriverSidebar() {

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
                    href="/driver"
                    className="flex items-center gap-3 p-3 rounded-xl hover:bg-[#33658A] transition"
                >
                    <ClipboardList size={20} />
                    My Jobs
                </Link>

                <Link
                    href="/schedule"
                    className="flex items-center gap-3 p-3 rounded-xl hover:bg-[#33658A] transition"
                >
                    <CalendarDays size={20} />
                    Schedule
                </Link>

            </nav>

            <button
                className="mt-auto flex items-center gap-3 p-3 rounded-xl hover:bg-[#F26419] transition"
                onClick={() => {
                    localStorage.removeItem("email");
                    localStorage.removeItem("role");
                    localStorage.removeItem("name");
                    window.location.href = "/login";
                }}
            >
                <LogOut size={20} />
                Logout
            </button>

        </aside>

    );

}