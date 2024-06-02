"use client";
import React, { useState, useTransition } from 'react'
import { CardWrapper } from './card-wrapper'
import { useForm } from 'react-hook-form'
import {  NewPasswordSchema} from '@/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import * as z from 'zod';
import { Input } from '@/components/ui/input';
import { Button } from '../ui/button';
import { FormError } from '../form-error';
import { FormSuccess } from '../form-success';
import { reset } from '@/actions/reset';



export default function NewPasswordForm() {

  const [error, setError]= useState< string|undefined >("");
  const [success, setSuccess]= useState<string|undefined>("");

  const [isPending, startTransiton]= useTransition();

  const form = useForm<z.infer<typeof NewPasswordSchema>>({
    resolver:zodResolver(NewPasswordSchema),
    defaultValues:{
      password:"",
    },
  });

  const onSubmit=(values: z.infer<typeof NewPasswordSchema>)=>{
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
<CardWrapper headerLabel="Create New Password" backButtonLabel="Remembered Your Credentials" backButtonHref="/auth/login"
     >
      <Form {...form}>
      <form
       onSubmit={form.handleSubmit(onSubmit)}
       className='space-y-6'
       >
        <div className="space-y-4">
          <FormField
          control={form.control}
          name='password'
          render={({field})=>(
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input
                {...field}
                disabled={isPending}
                placeholder='******'
                type='password'
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
