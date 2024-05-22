import {Poppins} from "next/font/google"
import {cn} from "@/lib/utils";
import {Button} from "@/components/ui/button";
import { LoginButton } from "@/components/auth/login-button";

const font = Poppins({
    subsets: ["latin"],
    weight: ["600"]
})
export default function Home() {
    return (
        
            <main
                className="flex h-full flex-col items-center justify-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-pink-500 to-purple-800">

                <div className="space-y-6">
                    <h1 className={cn("text-6xl font semi-bold text-white drop-shadow-md", font.className)}>
                         Authentication
                    </h1>
                
                    <p className="text-white">Level-6 Authentication</p>
                    <div>
                        <LoginButton >

                        <Button variant="ghost" size="lg" >Sign Up</Button>
                        </LoginButton>
                    </div>

                </div>
            </main>

       
    );
}
