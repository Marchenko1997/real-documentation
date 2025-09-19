"use client";

import { ReactNode } from "react";
import { getDocumentUsersWithDecorations } from "@/lib/actions/user.actions";
import { useUser } from "@clerk/nextjs";
import {
  LiveblocksProvider,
  ClientSideSuspense,
} from "@liveblocks/react/suspense";
import Loader from "@/components/Loader";

type MentionUser = { kind: "user"; id: string };

const Provider = ({ children }: { children: ReactNode }) => {
  const { user: clerkUser } = useUser();

  return (
    <LiveblocksProvider
      authEndpoint="/api/liveblocks-auth"
      resolveMentionSuggestions={async ({ text, roomId }) => {
        if (!clerkUser) return [];

        const roomUsers = await getDocumentUsersWithDecorations({
          roomId,
          currentUser: clerkUser.emailAddresses[0].emailAddress!,
          text,
        });

      
        const mapped: MentionUser[] = roomUsers.map((u: any) => ({
          kind: "user",
          id: String(u.email ?? u.id),
        }));

        return mapped;
      }}
    >
      <ClientSideSuspense fallback={<Loader />}>{children}</ClientSideSuspense>
    </LiveblocksProvider>
  );
};

export default Provider;
