"use server"

import { validateRequest } from "@/auth"
import prisma from "@/lib/prisma"
import { postDataInclude } from "@/lib/types";
import { createPostSchema } from "@/lib/validation"

export async function submitPost(input: {
  content: string;
}) {
  const { user } = await validateRequest()

  if (!user) throw new Error("Usuário não autorizado")

  const { content } = createPostSchema.parse(input)

  const newPost = await prisma.post.create({
    data: {
      content,
      userId: user.id,
    },
    include: postDataInclude
  })

  return newPost
}

export async function deletePost(id: string) {
  const { user } = await validateRequest()

  if (!user) throw new Error("Usuário não autorizado")

  const post = await prisma.post.findUnique({
    where: {
      id: id
    }
  })

  if (!post) throw new Error("Post não encontrado")

  if (post.userId !== user.id) throw new Error("Usuário não autorizado")

  const deletePost = await prisma.post.delete({
    where: {
      id: id
    },
    include: postDataInclude
  })

  return deletePost
}