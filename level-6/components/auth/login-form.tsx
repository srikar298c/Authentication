"use client";
import React, { useState, useTransition } from 'react'
import { CardWrapper } from './card-wrapper'
import { useForm } from 'react-hook-form'
import { LoginSchema } from '@/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import * as z from 'zod';
import { Input } from '@/components/ui/input';
import { Button } from '../ui/button';
import { FormError } from '../form-error';
import { FormSuccess } from '../form-success';
import { login } from '@/actions/login';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

export default function LoginForm() {
  const searchParams = useSearchParams() ;
const urlError = searchParams. get ("error") === "OAuthAccountNotLinked"
? "Email already in use with different provider!"
:"";
  const [error, setError]= useState< string|undefined >("");
  const [success, setSuccess]= useState<string|undefined>("");

  const [isPending, startTransiton]= useTransition();

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver:zodResolver(LoginSchema),
    defaultValues:{
      email:"",
      password:""
    },
  });

  const onSubmit=(values: z.infer<typeof LoginSchema>)=>{
    setError("")
    setSuccess("")
    startTransiton(()=>{
      login(values).then((data)=>{
        setError(data?.error);
        setSuccess(data?.success)
      })
    })
  
  };

  return (
<CardWrapper headerLabel="Welcome back" backButtonLabel="Don't have an account" backButtonHref="/auth/register"
    showSocial >
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
              <Button
              variant={"link"}
              size={"sm"}
              asChild
              className='px-0 font-normal'
              >
                <Link href="/auth/reset">Forgot password ?</Link>
              </Button>
                <FormMessage/>
            </FormItem>
            )}
          />         
        </div>
        <FormError message={error || urlError}/>
        <FormSuccess message={success}/>
          <Button
          className='w-full'
          type='submit'
      
          >Login</Button>
      </form>
      </Form>
    </CardWrapper>
  )
}
