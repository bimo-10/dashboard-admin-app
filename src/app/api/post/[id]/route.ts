import { NextResponse } from "next/server";
import { db } from "~/server/db";

export async function PUT(
  req: Request,
  { params: { id } }: { params: { id: string } },
) {
  const formData = await req.formData();

  if (!id) {
    return NextResponse.json({ message: `ID not Found`, status: 500 });
  }

  try {
    const post = await db.post.update({
      where: {
        id,
      },
      data: {
        imageUrl: formData.get("imageUrl") as string,
        title: formData.get("title") as string,
        content: formData.get("content") as string,
        date: new Date(formData.get("date") as string) || new Date(),
      },
    });

    return NextResponse.json(
      { data: post, message: `Update Post ${id}` },
      {
        status: 200,
      },
    );
  } catch (error) {
    return NextResponse.json({ message: `Error: ${error}`, status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params: { id } }: { params: { id: string } },
) {
  await db.post.delete({
    where: {
      id,
    },
  });

  return NextResponse.json({ message: `Delete Post ${id}`, status: 200 });
}
