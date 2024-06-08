"use client"
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { currentRole } from "@/lib/auth";

const AdminPage =()=>{
    const role =  currentRole();
    return(
        <Card className="w-[600px]">
            <CardHeader >
            <p className="text-2xl font-semibold text-center">
                🔑Auth
            </p>
            </CardHeader>
            <CardContent>
                
            </CardContent>
            
        </Card>
    )
}

export default AdminPage;