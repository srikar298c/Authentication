import React from 'react'
import { CardWrapper } from './card-wrapper'

export default function LoginForm() {
  return (
<CardWrapper headerLabel="Welcome back" backButtonLabel="Don't have and account" backButtonHref="/auth/register"
 showSocial={false}>
    Login Form
    </CardWrapper>
  )
}
