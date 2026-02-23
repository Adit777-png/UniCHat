import {
  generateUploadButton,
  generateUploadDropzone,
} from "@uploadthing/react";
import { createUploadthing } from "uploadthing/next";
import type { OurFileRouter } from "@/app/api/uploadthing/core";

export const utapi = createUploadthing();


export const UploadButton = generateUploadButton<OurFileRouter>();
export const UploadDropzone = generateUploadDropzone<OurFileRouter>();
