"use client";

import { ColumnDef } from "@tanstack/react-table";
import { useRouter } from "next/navigation";
import { Button } from "~/components/ui/button";
import { PostType } from "~/types/type";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const columns: ColumnDef<PostType>[] = [
  {
    accessorKey: "id",
    header: "ID",
    cell: (info) => Number(info.row.id) + 1,
  },
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
      const router = useRouter();
      console.log(info.table.options.data);
      return (
        <div key={info.row.id} className="flex gap-2">
          {/* <Button
            onClick={() =>
              console.log(info.table.options.data[Number(info.row.id)]?.id)
            }
            className="bg-teal-600"
          >
            Edit
          </Button> */}
          <Button
            variant="destructive"
            onClick={async () => {
              const response = await fetch(
                `http://localhost:3000/api/post/${info.table.options.data[Number(info.row.id)]?.id}`,
                {
                  method: "DELETE",
                },
              );
              router.refresh();
              const data = await response.json();
              // console.log(data);
              return data;
            }}
          >
            Delete
          </Button>
        </div>
      );
    },
  },
];
