import { auth, signOut } from "@/auth"


const SettingsPage = async()=>{
    const session = await auth();
    
    return(
        <div>
        I am Settings page
        {/* <form action = {async()=>{
            "use server";
            await signOut();
        }}>
            <button type="submit">
                Sign Out
            </button>
        </form> */}
        </div>
    )
}
export default SettingsPage;