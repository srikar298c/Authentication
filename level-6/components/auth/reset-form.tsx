"use client";
import React, { useState, useTransition } from 'react'
import { CardWrapper } from './card-wrapper'
import { useForm } from 'react-hook-form'
import {  ResetSchema } from '@/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import * as z from 'zod';
import { Input } from '@/components/ui/input';
import { Button } from '../ui/button';
import { FormError } from '../form-error';
import { FormSuccess } from '../form-success';
import { reset } from '@/actions/reset';
// import { useSearchParams } from 'next/navigation';



export default function ResetForm() {
  // const searchParams = useSearchParams();
  // const token = searchParams.get("token");
  const [error, setError]= useState< string|undefined >("");
  const [success, setSuccess]= useState<string|undefined>("");

  const [isPending, startTransiton]= useTransition();

  const form = useForm<z.infer<typeof ResetSchema>>({
    resolver:zodResolver(ResetSchema),
    defaultValues:{
      email:"",
    },
  });

  const onSubmit=(values: z.infer<typeof ResetSchema>)=>{
    setError("")
    setSuccess("")

    startTransiton(()=>{
      reset(values).then((data)=>{
        setError(data?.error);
        setSuccess(data?.success)
      })
    })
  
  };

  return (
<CardWrapper headerLabel="Forgot your passwrord.." backButtonLabel="Back to login" backButtonHref="/auth/login"
     >
      <Form {...form}>
      <form
       onSubmit={form.handleSubmit(onSubmit)}
       className='space-y-6'
       >
        <div className="space-y-4">
          <FormField
          control={form.control}
          name='email'
          render={({field})=>(
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                {...field}
                disabled={isPending}
                placeholder='jhon.doe@example.com'
                type='email'
                />
              </FormControl>
                <FormMessage/>
            </FormItem>
          )}

          />         
        </div>
        <FormError message={error}/>
        <FormSuccess message={success}/>

          <Button
          className='w-full'
          type='submit'
      
          >Send reset email</Button>
      </form>
      </Form>
    </CardWrapper>
  )
}
