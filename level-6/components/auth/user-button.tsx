"use client";

import { FaUser } from "react-icons/fa";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { DropdownMenu, DropdownMenuTrigger,DropdownMenuContent, DropdownMenuItem  } from "../ui/dropdown-menu";
import { useCurrentUser } from "@/hooks/use-current-user";


import { LogoutButton } from "@/components/auth/logout-button";
import { LogOut } from "lucide-react";
export const UserButton = () => {
    const user = useCurrentUser()
    return (
        <DropdownMenu>
        <DropdownMenuTrigger>
            <Avatar>
                <AvatarImage src={user?.image || ""}/>
                    <AvatarFallback className="bg-sky-500">
                     <FaUser className="text-white"/>
                </AvatarFallback>
            </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
            <LogoutButton>
                <DropdownMenuItem>
                 <LogOut className="h-4 w-4 mr-2 "/>
                 Log Out
                </DropdownMenuItem>
            </LogoutButton>
        </DropdownMenuContent>
    </DropdownMenu>
    )}
    

    