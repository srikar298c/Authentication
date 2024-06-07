import { UserInfo } from "@/components/user-info";
import { useCurrentUser } from "@/hooks/use-current-user"

const ServerPage = async()=>{
    const user = await useCurrentUser();
    return(
        <UserInfo
        user={user}
        label="💻Server component"/>
    )
}