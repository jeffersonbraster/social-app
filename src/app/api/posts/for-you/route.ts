import { validateRequest } from "@/auth";
import prisma from "@/lib/prisma";
import { postDataInclude } from "@/lib/types";

export async function GET() {
  try {
    const { user } = await validateRequest()

    if (!user) {
      return Response.json({ error: "Usuário não autorizado" }, { status: 404 });
    }

    const posts = await prisma.post.findMany({
      include: postDataInclude,
      orderBy: { createdAt: "desc" },
    });

    return Response.json(posts);
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Ocorreu um erro ao buscar os posts" }, { status: 500 });
  }
}