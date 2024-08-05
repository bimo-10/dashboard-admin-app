"use server";

import { postSchema } from "~/lib/schema";
import { db } from "./db";
import { revalidatePath } from "next/cache";

export async function getPostsAction() {
  const posts = await db.post.findMany();

  return {
    data: posts,
    message: "Get Posts Successfully",
  };
}

export async function createPostAction(prev: any, formData: FormData) {
  const result = postSchema.safeParse({
    imageUrl: formData.get("imageUrl") as string,
    title: formData.get("title") as string,
    content: formData.get("content") as string,
    date: formData.get("date") as string,
  });

  if (!result.success) {
    return {
      success: false,
      errors: result.error.flatten().fieldErrors,
    };
  }

  try {
    const post = await db.post.create({
      data: {
        imageUrl: result.data.imageUrl,
        title: result.data.title,
        content: result.data.content,
        date: result.data.date,
      },
    });

    revalidatePath("/admin");

    return {
      success: true,
      data: post,
      message: "Create Post Successfully",
    };
  } catch (error) {
    return {
      success: false,
      message: `Error: ${error}`,
    };
  }
}
