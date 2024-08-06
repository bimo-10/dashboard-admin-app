import React from "react";
import { CardBody, CardContainer, CardItem } from "./ui/3d-card";
import Image from "next/image";

type PostType = {
  id: string;
  title: string;
  imageUrl: string;
  content: string;
  date: Date;
};

export default function AdminPostCardSection({ posts }: { posts: PostType[] }) {
  //   console.log(posts);
  const moment = require("moment");
  require("moment/locale/id");
  moment.locale("id");
  return (
    <section className="my-20 flex min-h-screen flex-wrap items-center justify-center gap-2">
      {posts.map((post) => (
        <CardContainer
          key={post.id}
          className="inter-var"
          containerClassName="py-0"
        >
          <CardBody className="group/card relative h-auto w-auto rounded-xl border border-black/[0.1] bg-gray-50 p-6 dark:border-white/[0.2] dark:bg-black dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] sm:w-[30rem]">
            <CardItem translateZ="100" className="mt-4 w-full">
              <Image
                src={post.imageUrl}
                height="1000"
                width="1000"
                className="h-60 w-full rounded-xl object-cover group-hover/card:shadow-xl"
                alt={post.title}
              />
            </CardItem>

            <CardItem
              translateZ="50"
              className="text-xl font-bold text-neutral-600 dark:text-white"
            >
              {post.title}
            </CardItem>

            <CardItem
              as="p"
              translateZ="60"
              className="mt-2 max-w-sm text-sm text-neutral-500 dark:text-neutral-300"
            >
              {post.content}
            </CardItem>

            <CardItem
              translateZ={20}
              className="rounded-xl px-4 py-2 text-xs font-normal dark:text-white"
            >
              {moment(post.date).format("Do MMMM YYYY")}
            </CardItem>
          </CardBody>
        </CardContainer>
      ))}
    </section>
  );
}
