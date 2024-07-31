"use server"

import { validateRequest } from "@/auth"
import prisma from "@/lib/prisma"
import { createPostSchema } from "@/lib/validation"

export async function submitPost(input: {
  content: string;
}) {
  const { user } = await validateRequest()

  if (!user) throw new Error("Usuário não autorizado")

  const { content } = createPostSchema.parse(input)

  await prisma.post.create({
    data: {
      content,
      userId: user.id,
    }
  })
}