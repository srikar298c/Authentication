 import React from 'react'


import { Header } from "./header"
import { CardWrapper } from './card-wrapper'
import { BsExclamationTriangle } from 'react-icons/bs'


type Props = {}

export default function ErrorCard({}: Props) {
  return (
    <CardWrapper
    headerLabel="OOPS! Something went wrong..." backButtonLabel="Back to login Page" backButtonHref="/auth/error"
    >
        <div className="w-full flex justify-center items-center">
            <BsExclamationTriangle className='text-destructive'/>
        </div>
    </CardWrapper>
  )
}