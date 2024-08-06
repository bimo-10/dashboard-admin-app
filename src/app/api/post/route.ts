import { NextResponse } from "next/server";
import { postSchema } from "~/lib/schema";
import { db } from "~/server/db";

export async function GET() {
  const posts = await db.post.findMany({
    orderBy: {
      updatedAt: "desc",
    },
  });

  return NextResponse.json(
    {
      data: posts,
      message: "Get Posts Successfully",
    },
    { status: 200 },
  );
}

export async function POST(req: Request) {
  const formData = await req.formData();

  const result = postSchema.safeParse({
    imageUrl: formData.get("imageUrl") as string,
    title: formData.get("title") as string,
    content: formData.get("content") as string,
    date: new Date(formData.get("date") as string),
  });

  if (!result.success) {
    return NextResponse.json(
      {
        success: false,
        errors: result.error.flatten().fieldErrors,
      },
      { status: 400 },
    );
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

    return NextResponse.json(
      {
        success: true,
        data: post,
        message: "Create Post Successfully",
      },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: `Error: ${error}`,
      },
      { status: 500 },
    );
  }
}
