import { auth } from "@/auth"

export const settings = async()=>{
    const session = await auth();
    return(
        <div>

        {JSON.stringify(session)}
        </div>
    )
}