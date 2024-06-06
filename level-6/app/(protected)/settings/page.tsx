"use client"
import { logout } from "@/actions/logout";
import { useCurrentUser } from "@/hooks/use-current-user";



const SettingsPage = ()=>{
    const user = useCurrentUser()
    const onClick =()=>{
        logout();
    }
    return(
        <div>
       {JSON.stringify(user)}
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