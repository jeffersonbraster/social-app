import { validateRequest } from "@/auth";
import prisma from "@/lib/prisma";
import { postDataInclude, PostsPage } from "@/lib/types";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const cursor = req.nextUrl.searchParams.get("cursor") || undefined;

    const pageSize = 10;

    const { user } = await validateRequest()

    if (!user) {
      return Response.json({ error: "Usuário não autorizado" }, { status: 404 });
    }

    const posts = await prisma.post.findMany({
      include: postDataInclude,
      orderBy: { createdAt: "desc" },
      take: pageSize + 1,
      cursor: cursor ? { id: cursor } : undefined
    });

    const nextCursor = posts.length > pageSize ? posts[pageSize].id : null;

    const data: PostsPage = {
      posts: posts.slice(0, pageSize),
      nextCursor
    }

    return Response.json(data);
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Ocorreu um erro ao buscar os posts" }, { status: 500 });
  }
}