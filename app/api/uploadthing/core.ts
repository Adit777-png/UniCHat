import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";
import { auth } from "@clerk/nextjs/server";

const f = createUploadthing();

const handleAuth = async () =>{
    const {userId} = await auth();
    if(!userId) throw new UploadThingError("Unortherised");
    console.log("authorization passed");
    
    return {userId: userId};
}

export const ourFileRouter = {
  serverImage: f({ image: {maxFileSize: "4MB" , maxFileCount: 1 } } )
  .middleware(() => handleAuth())
  .onUploadComplete(() => {
    console.log("upload successful");
  }), 
  messageFile: f(["image" , "pdf"])
  .middleware(() => handleAuth())
  .onUploadComplete(()=>{
    console.log("upload successful");
  }).onUploadError((err:any)=>{
    console.log(err);
    
  })
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
