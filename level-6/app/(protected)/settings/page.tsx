import { auth } from "@/auth"

export const SettingsPage = async()=>{
    const session = await auth();
    return(
        <div className=""></div>
    )
}