import React from "react";
import { columns } from "./columns";
import { DataTable } from "./data-table";

const fetchDeletePost = async (id: string) => {
  const response = await fetch(`http://localhost:3000/api/post/${id}`, {
    method: "DELETE",
  });
  const data = await response.json();
  console.log(data);
};

export default async function PostTablePage() {
  const response = await fetch("http://localhost:3000/api/post", {
    cache: "no-store",
  });
  const data = await response.json();
  const posts = data.data;
  console.log(posts);

  return (
    <main>
      <DataTable columns={columns} data={posts} />
    </main>
  );
}
