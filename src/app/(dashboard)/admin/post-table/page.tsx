import React from "react";
import { columns } from "./columns";
import { DataTable } from "./data-table";

export default async function PostTablePage() {
  const response = await fetch("http://localhost:3000/api/post");
  const data = await response.json();
  const posts = data.data;
  console.log(posts);
  return (
    <main>
      <DataTable columns={columns} data={posts} />
    </main>
  );
}
