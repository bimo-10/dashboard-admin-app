"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Button } from "~/components/ui/button";
import { PostType } from "~/types/type";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const columns: ColumnDef<PostType>[] = [
  {
    accessorKey: "imageUrl",
    header: "Image Url",
  },
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "content",
    header: "Content",
  },
  {
    accessorKey: "date",
    header: "Date",
    cell: (info) =>
      info.cell.getValue<Date>().toLocaleString("en-US", {
        day: "numeric",
        month: "short",
        year: "numeric",
      }),
  },
  {
    accessorKey: "action",
    header: "Action",
    cell: (info) => {
      console.log(info);
      return (
        <div key={info.row.id} className="flex gap-2">
          <Button
            onClick={() => console.log(info.row.id)}
            className="bg-teal-600"
          >
            Edit
          </Button>
          <Button variant="destructive">Delete</Button>
        </div>
      );
    },
  },
];
