"use client"
import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const font = Poppins({ subsets: ["latin"], weight: ["600"] });

export default function Home() {
  const router = useRouter();

  const onSubmission = () => {
    router.push("/auth/login");
  };

  return (
    <main
      className={cn(
        "flex h-full flex-col items-center justify-center",
        "bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-400 to-purple-800"
      )}
    >
      <div className="space-y-6">
        <h1
          className={cn(
            "text-6xl font-semibold text-white drop-shadow-md",
            font.className
          )}
        >
          Authentication
        </h1>
        <p className="text-white">Level-6 Authentication</p>
        <div>
          <Button onClick={onSubmission}>Button</Button>
        </div>
      </div>
    </main>
  );
}