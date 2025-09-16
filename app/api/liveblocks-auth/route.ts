// app/api/liveblocks-auth/route.ts
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { liveblocks } from "@/lib/liveblocks";
import { getUserColor } from "@/lib/utils";

export async function POST() {
  const clerkUser = await currentUser();
  if (!clerkUser) redirect("/sign-in");

  const { id, firstName, lastName, emailAddresses, imageUrl } = clerkUser;

  const user = {
    id,
    info: {
      id,
      name: `${firstName ?? ""} ${lastName ?? ""}`.trim(),
      email: emailAddresses[0].emailAddress,
      avatar: imageUrl,
      color: getUserColor(id),
    },
  };

  const { status, body } = await liveblocks.identifyUser(
    { userId: user.info.email },
    { userInfo: user.info }
  );

  return new Response(body, { status });
}
