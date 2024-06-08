"use client";

import { UserRole } from "@prisma/client";

interface RoleGateProps{
    children: React.ReactNode;
    allowedRole: UserRole;
}
 export RoleGate=({
    children,
    allowedRole
 }:RoleGateProps)=>{
    const role = useCurrentRole();
    return(
        if(role !== allowedRole){
            return{

            }
        }
    )
 }