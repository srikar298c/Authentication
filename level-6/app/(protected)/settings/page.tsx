"use client"
import { logout } from "@/actions/logout";
import { useCurrentUser } from "@/hooks/use-current-user";



const SettingsPage = ()=>{
    const session = useCurrentUser()
    const onClick =()=>{
        logout();
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