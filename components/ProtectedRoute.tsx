"use client";

import { useEffect } from "react";

export default function ProtectedRoute({

    children,
    allowedRoles

}:{
    children:React.ReactNode;
    allowedRoles:string[];
}){

    useEffect(()=>{

        const role =
            localStorage.getItem("role");

        if(!role){

            window.location.href="/login";

            return;
        }

        if(!allowedRoles.includes(role)){

            window.location.href="/login";

        }

    },[]);

    return children;

}