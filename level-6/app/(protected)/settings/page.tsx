"use client"
import { signOut, useSession } from "next-auth/react";


const SettingsPage = ()=>{
    const session = useSession()
    const onClick =()=>{
        signOut
    }
    return(
        <div>
       {JSON.stringify(session)}
        <form>
            <button type="submit"
            onClick={onClick}>
                Sign Out
            </button>
        </form>
        </div>
    )
}
export default SettingsPage;