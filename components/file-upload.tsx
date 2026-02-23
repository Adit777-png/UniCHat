"use client";

import { UploadDropzone } from "@/lib/uploadthing";
import type { OurFileRouter } from "@/app/api/uploadthing/core";
import "@uploadthing/react/styles.css";
import { X } from "lucide-react";
import Image from "next/image";
interface FileUploadProps {
  onChange: (url: string) => void;
  value: string;
  endpoint: keyof OurFileRouter; // ✅ IMPORTANT
}

export const FileUpload = ({
  onChange,
  value,
  endpoint,
}: FileUploadProps) => {
  const fileType = value?.split

  return (
    <UploadDropzone
      endpoint={endpoint}
      onClientUploadComplete={(res) => {
        if (!res || res.length === 0) return;
        onChange(res[0].url); // ✅ correct property
      }}
      onUploadError={(error: Error) => {
        console.error(error);
      }}
    />
  );
};
