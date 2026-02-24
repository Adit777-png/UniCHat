import { currentProfile } from "@/lib/current-profile"
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { NavigationAction } from "./navigation-action";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";

export const  NavigationSidebar = async() => {
    const profile = await currentProfile();
    if(!profile){
        return redirect("/sign-in");
    }
    const servers = await db.server.findMany({
        where:{
            members:{
                some:{
                    profileId: profile.id
                }
            }
        }
    });
   return (
  <div className="fixed inset-y-0 left-0 w-[72px] 
                flex flex-col items-center space-y-4
                bg-zinc-100 dark:bg-[#1E1F22] py-3">
    <NavigationAction />
    <Separator className="h-[2px] w-10 bg-zinc-300 dark:bg-zinc-700 rounded-md" />
    <ScrollArea className="flex-1 w-full">
        {servers.map((server) =>(
            <div key={server.id}>
                {server.name}
            </div>
        ))}
    </ScrollArea>
  </div>
);
}