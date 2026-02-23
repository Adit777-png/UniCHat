"use client";

import * as z from "zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FileUpload } from "@/components/file-upload";

const formSchema = z.object({
  name: z.string().min(1, { message: "Server name is required." }),
  imageUrl: z.string().min(1, { message: "Server image is required." }),
});

export const InitialModal = () => {
  const [isMounted, setIsMounted] = useState(false);
  const [open, setOpen] = useState(true); // ✅ defined here

  useEffect(() => setIsMounted(true), []);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      imageUrl: "",
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log(values);
    setOpen(false); // ✅ works
  };

  if (!isMounted) return null;
  return (
    <Dialog open={open} onOpenChange={setOpen}>
  <DialogContent
    className="
      fixed inset-0 z-50
      flex items-center justify-center
      bg-black/50
    "
  >
    <div className="w-full max-w-md bg-background rounded-lg shadow-lg overflow-hidden">
      {/* HEADER */}
      <DialogHeader className="p-6 text-center">
        <DialogTitle className="text-2xl font-bold">
          Customise your server
        </DialogTitle>
        <DialogDescription className="text-zinc-500">
          Give your server a name and image
        </DialogDescription>
      </DialogHeader>

      {/* BODY */}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="px-6 space-y-6">
            <div className="flex justify-center">
              <FormField
                control={form.control}
                name="imageUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <FileUpload
                        endpoint="serverImage"
                        value={field.value}
                        onChange={field.onChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="uppercase text-xs font-bold text-zinc-500">
                    Server name
                  </FormLabel>
                  <FormControl>
                    <Input
                      disabled={isLoading}
                      placeholder="Enter server name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* FOOTER */}
          <div className="px-6 py-4 bg-gray-100 flex justify-end">
            <Button type="submit" disabled={isLoading}>
              Create
            </Button>
          </div>
        </form>
      </Form>
    </div>
  </DialogContent>
</Dialog>

  );
};
