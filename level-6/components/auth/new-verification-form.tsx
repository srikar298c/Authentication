"use client"
import React, { useCallback, useEffect } from 'react'
import { CardWrapper } from './card-wrapper'
import {BeatLoader} from "react-spinners"
import { useSearchParams } from 'next/navigation'
type Props = {}

function NewVerificationForm({}: Props) {
    const searchParams = useSearchParams();
const token = searchParams.get ("token") ;
const onSubmit = useCallback(() => {
console.log(token);
 }, [token] );
useEffect(()=>{
onSubmit();
},[onSubmit]);
  return (
    <CardWrapper
    headerLabel='Conforming your verification'
    backButtonHref='/auth/login'
    backButtonLabel='Back to Login'>
        <div className="flex items-center w-full justify-center">
            <BeatLoader/>
        </div>
    </CardWrapper>
  )
}

export default NewVerificationForm