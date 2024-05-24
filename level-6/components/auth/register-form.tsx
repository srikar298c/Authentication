"use client";
import React, { useState, useTransition } from 'react'
import { CardWrapper } from './card-wrapper'
import { useForm } from 'react-hook-form'
import { RegisterSchema } from '@/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import * as z from 'zod';
import { Input } from '@/components/ui/input';
import { Button } from '../ui/button';
import { FormError } from '../form-error';
import { FormSuccess } from '../form-success';
import { register } from '@/actons/register';

export default function RegisterForm() {

  const [error, setError]= useState< string|undefined >("");
  const [success, setSuccess]= useState<string|undefined>("");

  const [isPending, startTransiton]= useTransition();

  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver:zodResolver(RegisterSchema),
    defaultValues:{
      email:"",
      password:"",
      name: ""
    },
  });

  const onSubmit=(values: z.infer<typeof RegisterSchema>)=>{
    setError("")
    setSuccess("")
    startTransiton(()=>{
      register(values).then((data)=>{
        setError(data.error);
        setSuccess(data.success)
      })
    })
  
  };

  return (
<CardWrapper headerLabel="Welcome back" backButtonLabel="Already have an account" backButtonHref="/auth/login"
    showSocial >
      <Form{...form}>
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
                placeholder='Please Enter Password'
                type='password'
                />
              </FormControl>
                <FormMessage/>
            </FormItem>
            )}
          />         
          <FormField
          control={form.control}
          name='name'
          render={({field})=>(
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input
                {...field}
                disabled={isPending}
                placeholder='Please Enter your Name'
                type='text'
                />
              </FormControl>
                <FormMessage/>
            </FormItem>
            )}
          />         
        </div>
        <FormError message='error'/>
        <FormSuccess message="success"/>
          <Button
          className='w-full'
          type='submit'
      
          >Create an Account</Button>
      </form>
      </Form>
    </CardWrapper>
  )
}
