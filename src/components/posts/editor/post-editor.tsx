"use client";

import { EditorContent, useEditor } from "@tiptap/react";
import Starterkit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import { submitPost } from "../actions";
import UserAvatar from "@/components/user-avatar";
import { useSession } from "@/app/(main)/session-provider";
import { Button } from "@/components/ui/button";
import "./styles.css";

const PostEditor = () => {
  const { user } = useSession();

  const editor = useEditor({
    extensions: [
      Starterkit.configure({
        bold: false,
        italic: false,
      }),
      Placeholder.configure({
        placeholder: "Se o kaiju 8 perder o controle, quem irá detê-lo?",
      }),
    ],
  });

  const input =
    editor?.getText({
      blockSeparator: "\n",
    }) || "";

  async function onSubmit() {
    await submitPost({ content: input });
    editor?.commands.clearContent();
  }

  return (
    <div className="flex flex-col gap-5 rounded-2xl bg-card p-5 shadow-sm">
      <div className="flex gap-5">
        <UserAvatar avatarUrl={user.avatarUrl} className="hidden sm:inline" />
        <EditorContent
          editor={editor}
          className="max-h-[20rem] w-full overflow-x-auto rounded-2xl bg-background px-5 py-3"
        />
      </div>

      <div className="flex justify-end">
        <Button
          onClick={onSubmit}
          disabled={!input.trim()}
          className="min-w-20"
        >
          Postar
        </Button>
      </div>
    </div>
  );
};

export default PostEditor;
