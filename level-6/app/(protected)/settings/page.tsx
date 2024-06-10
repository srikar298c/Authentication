"use client"
import * as z from "zod";
import { settings } from "@/actions/settings";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useSession } from "next-auth/react";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { SettingsSchema } from "@/schemas";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useCurrentUser } from "@/hooks/use-current-user";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";


const SettingsPage = ()=>{

    const user= useCurrentUser();
    const {update} = useSession();
   const [isPending, startTransiton]= useTransition();
   const form = useForm<z.infer<typeof SettingsSchema>>({
    resolver: zodResolver(SettingsSchema),
    defaultValues:{
        name: user?.name || undefined,    }
   });
   const [error, setError] = useState<string| undefined>()
   const [success, setSuccess] = useState<string| undefined>()
    const onSubmit =(values: z.infer<typeof SettingsSchema>)=>{
        startTransiton(()=>{

            settings(values).then((data)=>{
                if(data.error){
                    setError(data.error)
                }
                if(data.success){
                    update();
                    setSuccess(data.success)
                }
            }).catch(()=>setError("Something went wrong!"))
        })
    }
    return(
       <Card className="w-[600px] ">
        <CardHeader>
        <p className="text-2xl font-semibold text-center">
            ⚙️ Settings
        </p>
        </CardHeader>
        <CardContent>
        <Form {...form}>
        <form 
        className="space-y-6 " onSubmit={form.handleSubmit(onSubmit)}
        >
     <div className="space-y-4">
        <FormField control={form.control}
        name ="name"
        render= {({field})=>(
            <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                    <Input
                    {...field}
                    placeholder="John Doe"
                    disabled={isPending}
                    />
                </FormControl>
            </FormItem>
        )}
        />
    </div>
    <FormError message={error}/>
    <FormSuccess message={success}/>
        <Button
        type="submit"
        >
            SAVE INFORMATION
        </Button>
        </form>
        </Form>
        </CardContent>
       </Card>
    )
}
export default SettingsPage;