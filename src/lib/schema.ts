import { z } from "zod";

export const postSchema = z.object({
  imageUrl: z.string(),
  title: z.string().min(3),
  content: z.string(),
  date: z.date({
    required_error: "Date is required",
  }),
});
