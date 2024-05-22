"use client";

import{
    Card,
    CardContent,
    CardFooter,
    CardHeader
} from "@/components/ui/card";

interface CardWrapperProps{
    children:React.ReactNode;
    headerLabel:string;
    backButtonLabel:string;
    backButtonHref:String;
    showSocial:boolean;
};

export const CardWrapper =({
    children,
    headerLabel,
    backButtonHref,
    backButtonLabel,
    showSocial

}:CardWrapperProps)=>{
    return(
        <Card className="w-[400px] shadow-md">
            LoginForm
        </Card>
    )
}