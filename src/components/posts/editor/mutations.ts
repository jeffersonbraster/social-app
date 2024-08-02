import { toast, useToast } from "@/components/ui/use-toast";
import { InfiniteData, QueryFilters, useMutation, useQueryClient } from "@tanstack/react-query";
import { deletePost, submitPost } from "../actions";
import { PostData, PostsPage } from "@/lib/types";
import { usePathname, useRouter } from "next/navigation";

export function useSubmitPostMutation() {
  const { toast } = useToast();

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: submitPost,
    onSuccess: async (newPost) => {
      const queryFilter: QueryFilters = { queryKey: ["post-feed", "for-you"] };
      await queryClient.cancelQueries(queryFilter);

      queryClient.setQueriesData<InfiniteData<PostsPage, string | null>>(
        queryFilter,
        (oldData) => {
          const firstPage = oldData?.pages[0];

          if (firstPage) {
            return {
              pageParams: oldData.pageParams,
              pages: [
                {
                  posts: [newPost, ...firstPage.posts],
                  nextCursor: firstPage.nextCursor
                },
                ...oldData.pages.slice(1)
              ]
            }
          }
        }
      )

      queryClient.invalidateQueries({
        queryKey: queryFilter.queryKey,
        predicate(query) {
          return !query.state.data
        }
      })

      toast({
        variant: "default",
        description: "Post criado com sucesso!",
      });
    },
    onError: (error) => {
      console.error(error);
      toast({
        variant: "destructive",
        description: "Ocorreu um erro ao criar o post, tente novamente.",
      })
    }
  })

  return mutation;
}

export function useDeletePostMutation() {
  const { toast } = useToast();

  const queryClient = useQueryClient();

  const router = useRouter();
  const pathname = usePathname();

  const mutation = useMutation({
    mutationFn: deletePost,
    onSuccess: async (deletedPost) => {
      const queryFilter: QueryFilters = { queryKey: ['post-feed'] }

      await queryClient.cancelQueries(queryFilter);

      queryClient.setQueriesData<InfiniteData<PostsPage, string | null>>(
        queryFilter,
        (oldData) => {
          if (!oldData) return;

          return {
            pageParams: oldData.pageParams,
            pages: oldData.pages.map((page) => ({
              nextCursor: page.nextCursor,
              posts: page.posts.filter((post) => post.id !== deletedPost.id)
            })),
          }
        }
      )

      toast({
        variant: "default",
        description: "Post deletado com sucesso!",
      });

      if (pathname === `/posts/${deletedPost.id}`) {
        router.push(`/usuario/${deletedPost.user.username}`);
      }
    },
    onError(error) {
      console.error(error);
      toast({
        variant: "destructive",
        description: "Ocorreu um erro ao deletar o post, tente novamente.",
      })
    }
  })

  return mutation
}