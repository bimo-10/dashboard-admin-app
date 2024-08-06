import { SignIn } from "@clerk/clerk-react";
import { currentUser } from "@clerk/nextjs/server";
import React from "react";
import AdminPostCardSection from "~/components/AdminPostCardSection";

export default async function AdminPage() {
  const response = await fetch("http://localhost:3000/api/post", {
    cache: "no-store",
  });
  const data = await response.json();
  const posts = data.data;

  // console.log(posts);

  // if (!user) {
  //   return (
  //     <div>
  //       <SignIn />
  //     </div>
  //   );
  // }

  return (
    <main>
      <AdminPostCardSection posts={posts} />
    </main>
  );
}
