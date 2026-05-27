"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function Navbar(){

    const [role,setRole] = useState("");

    useEffect(()=>{

        const savedRole =
            localStorage.getItem("role");

        if(savedRole){

            setRole(savedRole);

        }

    },[]);

    function logout(){

        localStorage.clear();

        window.location.href="/login";

    }

    return(

        <nav className="border-b p-4 flex gap-6 items-center">

            {role==="ADMIN" && (

                <>
                    <Link href="/admin">

                        Admin

                    </Link>

                    <Link href="/jobs">

                        Jobs

                    </Link>

                    <Link href="/drivers">

                        Drivers

                    </Link>
                </>

            )}

            {role==="DISPATCHER" && (

                <>
                    <Link href="/dispatcher">

                        Dashboard

                    </Link>

                    <Link href="/jobs">

                        Jobs

                    </Link>
                </>

            )}

            {role==="DRIVER" && (

                <>
                    <Link href="/driver">

                        My Jobs

                    </Link>
                </>

            )}

            <button
                className="ml-auto border px-4 py-2 rounded"
                onClick={logout}
            >

                Logout

            </button>

        </nav>

    )

}