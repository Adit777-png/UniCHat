import { redirect } from "next/navigation";
import { initialProfile } from "@/lib/initial-profile";
import { db } from "@/lib/db";
import { UserButton } from "@clerk/nextjs";
import { ModeToggle } from "@/components/mode-toggle";
import { InitialModal } from "@/components/modals/initial-modal";
import { FileUpload } from "@/components/file-upload";
import ServerIdPage from "../(main)/(routes)/servers/[serverId]/page";
import MainLayout from "../(main)/(routes)/layout";
import { NavigationSidebar } from "@/components/navigation/navigation-sidebar";

const ServerPage = async () => {
    const profile = await initialProfile();
    const server = await db.server.findFirst({
        where:{
            members:{
                some:{
                    profileId: profile.id
                }
            }
        }
    });
    if(server){
        return redirect(`/servers/${server.id}`);
    }
    return(
    <>
     <ServerIdPage />
     <NavigationSidebar />
    </>);
}
 
export default ServerPage;

// export default function Home() {
//   return <InitialModal />;
// }