import CollaborativeRoom from "@/components/CollaborativeRoom";
import { getDocument } from "@/lib/actions/room.actions";
import { getDocumentUsersWithDecorations } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

const Document = async ({ params: { id } }: SearchParamProps) => {
  const clerkUser = await currentUser();
  if (!clerkUser) redirect("/sign-in");

  const currentEmail = clerkUser.emailAddresses?.[0]?.emailAddress;

 const room = await getDocument({
   roomId: id,
   userEmail: clerkUser.emailAddresses[0].emailAddress,
 });
  if (!room) redirect("/");

  const usersAccesses = room.usersAccesses ?? {};

  // 🔥 Новый вызов: берём сразу декорированных юзеров
  const usersData = await getDocumentUsersWithDecorations({
    roomId: id,
    currentUser: currentEmail!,
    text: "",
  });

  // Определяем роль текущего пользователя
  const currentUserType =
    currentEmail && usersAccesses[currentEmail]?.includes("room:write")
      ? "editor"
      : "viewer";

  return (
    <main className="flex w-full flex-col items-center">
      <CollaborativeRoom
        roomId={id}
        roomMetadata={room.metadata}
        users={usersData ?? []}
        currentUserType={currentUserType}
      />
    </main>
  );
};

export default Document;
