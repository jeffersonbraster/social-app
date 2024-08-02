"use client";

import { EditorContent, useEditor } from "@tiptap/react";
import Starterkit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import UserAvatar from "@/components/user-avatar";
import { useSession } from "@/app/(main)/session-provider";
import "./styles.css";
import { useSubmitPostMutation } from "./mutations";
import LoadingButton from "@/components/loading-button";

const PostEditor = () => {
  const { user } = useSession();

  const mutation = useSubmitPostMutation();

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

  function onSubmit() {
    mutation.mutate(
      { content: input },
      {
        onSuccess: () => {
          editor?.commands.clearContent();
        },
      },
    );
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
        <LoadingButton
          onClick={onSubmit}
          loading={mutation.isPending}
          disabled={!input.trim()}
          className="min-w-20"
        >
          Postar
        </LoadingButton>
      </div>
    </div>
  );
};

export default PostEditor;
