import PostEditor from "@/components/posts/editor/post-editor";
import TrendSidebar from "@/components/trend-sidebar";
import ForYouFeed from "./for-you-feed";

export default function Home() {
  return (
    <main className="flex w-full min-w-0 gap-5">
      <div className="w-full min-w-0 space-y-5">
        <PostEditor />

        <ForYouFeed />
      </div>

      <TrendSidebar />
    </main>
  );
}
