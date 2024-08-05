"use client";

import React, { useState } from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Button } from "./ui/button";
import { cn } from "~/lib/utils";
import { date, z } from "zod";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { Calendar } from "./ui/calendar";
import { Textarea } from "./ui/textarea";
import { UploadButton } from "~/utils/uploadthing";
import { useFormState } from "react-dom";
import { createPostAction } from "~/server/actions";
import { useForm } from "react-hook-form";
import { postSchema } from "~/lib/schema";

import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel } from "./ui/form";
import { useRouter } from "next/navigation";

export default function AdminAddPostSection() {
  // const [date, setDate] = useState<Date>();
  const [urlImage, setUrlImage] = useState<string>("");
  const router = useRouter();
  // const [state, action] = useFormState(createPostAction, null);

  const form = useForm<z.infer<typeof postSchema>>({
    resolver: zodResolver(postSchema),
    defaultValues: {
      imageUrl: "",
      title: "",
      content: "",
      date: new Date(),
    },
  });

  const handleCreatePostSubmit = async (values: z.infer<typeof postSchema>) => {
    values.imageUrl = urlImage;
    const formData = new FormData();
    formData.append("imageUrl", urlImage);
    formData.append("title", values.title);
    formData.append("content", values.content);
    formData.append("date", values.date.toString());
    try {
      const response = await fetch("http://localhost:3000/api/post", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to create post");
      }

      const data = await response.json();
      console.log(data);

      router.push("/admin");
      form.reset();

      return data;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="space-y-4 p-8">
      <h3 className="text-4xl font-bold">Add Post</h3>

      {/* <form action={action}>
        <div className="space-y-4">
          <div className="flex flex-col gap-2">
            <Label>Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-[280px] justify-start text-left font-normal",
                    !date && "text-muted-foreground",
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
          <div className="flex flex-col gap-2">
            <Label>Image</Label>
            <UploadButton
              endpoint="imageUploader"
              onClientUploadComplete={(res) => {
                // Do something with the response
                console.log("Files: ", res);
                setImageUrl(res[0]?.url ?? "");
                alert("Upload Completed");
              }}
              onUploadError={(error: Error) => {
                // Do something with the error.
                alert(`ERROR! ${error.message}`);
              }}
            />
          </div>

          <div>
            <Label htmlFor="title" className="ml-1 text-lg">
              Title
            </Label>
            <Input
              id="title"
              type="text"
              name="title"
              placeholder="Title"
              className="w-96"
            />
          </div>

          <div>
            <Label htmlFor="content" className="ml-1 text-lg">
              Content
            </Label>
            <Textarea id="content" name="content" rows={6} />
          </div>

          <Button className="w-full bg-blue-600 hover:bg-blue-900">
            Add Post
          </Button>
        </div>
      </form> */}

      <Form {...form}>
        <form
          className="space-y-2"
          onSubmit={form.handleSubmit(handleCreatePostSubmit)}
        >
          <div className="flex items-center justify-between gap-2">
            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-[240px] pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground",
                          )}
                        >
                          {field.value ? (
                            format(field.value, "dd MMM yyyy")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={
                          field.value ? new Date(field.value) : undefined
                        }
                        onSelect={field.onChange}
                        // disabled={(date) =>
                        //   date > new Date() || date < new Date("1900-01-01")
                        // }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="imageUrl"
              render={({ field }) => (
                <FormItem className="flex-1 text-center">
                  <FormLabel>Image</FormLabel>
                  <UploadButton
                    endpoint="imageUploader"
                    onClientUploadComplete={(res) => {
                      // Do something with the response
                      setUrlImage(res[0]?.url ?? "");
                      console.log("Files: ", res);
                      alert("Upload Completed");
                    }}
                    onUploadError={(error: Error) => {
                      // Do something with the error.
                      alert(`ERROR! ${error.message}`);
                    }}
                  />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input type="text" {...field} />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Content</FormLabel>
                <FormControl>
                  <Textarea rows={6} {...field} />
                </FormControl>
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="text-md bg-blue-600 hover:bg-blue-900"
            size="lg"
          >
            Add Post
          </Button>
        </form>
      </Form>
    </div>
  );
}
