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
import { Select, SelectItem } from "@/components/ui/select";
import { SelectContent, SelectTrigger, SelectValue } from "@/components/ui/select";
import { UserRole } from "@prisma/client";


const SettingsPage = ()=>{

    const user= useCurrentUser();
    const {update} = useSession();
   const [isPending, startTransiton]= useTransition();
   const form = useForm<z.infer<typeof SettingsSchema>>({
    resolver: zodResolver(SettingsSchema),
    defaultValues:{
        name: user?.name || undefined, 
        email : user?.email||undefined,
        password: undefined,
        newPassword: undefined,
        role: user?.role || undefined,
      }
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
        <FormField control={form.control}
        name ="email"
        render= {({field})=>(
            <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                    <Input
                    {...field}
                    placeholder="johndoe@example.com"
                    type="email"
                    disabled={isPending}
                    />
                </FormControl>
            </FormItem>
        )}
        />
        <FormField control={form.control}
        name ="password"
        render= {({field})=>(
            <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                    <Input
                    {...field}
                    placeholder="******"
                    type="passoword"
                    disabled={isPending}
                    />
                </FormControl>
            </FormItem>
        )}
        />
        <FormField control={form.control}
        name ="newPassword"
        render= {({field})=>(
            <FormItem>
                <FormLabel>New password</FormLabel>
                <FormControl>
                    <Input
                    {...field}
                    placeholder="******"
                    type="passoword"
                    disabled={isPending}
                    />
                </FormControl>
            </FormItem>
        )}
        />
        <FormField control={form.control}
        name ="newPassword"
        render= {({field})=>(
            <FormItem>
                <FormLabel>Role</FormLabel>
               <Select
               disabled={isPending}
               onValueChange={field.onChange}
               defaultValue={field.value}>
                <FormControl>
                    <SelectTrigger>
                        <SelectValue
                        placeholder="Select a role"/>
                    </SelectTrigger>
                </FormControl>
                <SelectContent>
                    <SelectItem value={UserRole.ADMIN}>
                    Admin
                    </SelectItem>
                    <SelectItem value={UserRole.USER}>
                    User
                    </SelectItem>
                </SelectContent>
               </Select>
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