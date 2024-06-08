"use client"
import { RoleGate } from "@/components/auth/role-gate";
import { FormSuccess } from "@/components/form-success";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { UserRole } from "@prisma/client";
import { toast } from "sonner";



const AdminPage =()=>{
    const onServerActionClick=()=>{
        
    }
    const onApiRouteClick =()=>{
        fetch("/api/admin").then((response)=>{
            if(response.ok){
                toast.success("Allowed API Route")
            }else{
                toast.error("Forbidden Api Route")
            }
        })
    }
    return(
        <Card className="w-[600px]">
            <CardHeader >
            <p className="text-2xl font-semibold text-center">
                🔑Auth
            </p>
            </CardHeader>
            <CardContent>
            <RoleGate allowedRole={UserRole.ADMIN} >
            <FormSuccess
            message="You are allowed to see this content"
            />
            </RoleGate>
            <div className="flex flex-row items-center justify-between
rounded-lg border p-3 shadow-md">

    <p className="text-sm font-medium">
            Admin-only API Route
                </p>
            <Button onClick={onApiRouteClick}>
                    Click to test</Button>
</div>

        <div className="flex flex-row items-center justify-between
rounded-lg border p-3 shadow-md">
        <p className="text-sm font-medium">
Admin-only Server Action
            </p>
<Button>Reset</Button>
</div>
            </CardContent>
            
        </Card>
    )
}

export default AdminPage;