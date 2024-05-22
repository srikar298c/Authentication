import React, { Children } from 'react'

export default function AuthLayout({children}:{children: React.ReactNode}) {
  return (
   <div className="h-full flex flex-col items-center justify-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-pink-500 to-purple-800 ">
   {children}
   </div>
  )
}
