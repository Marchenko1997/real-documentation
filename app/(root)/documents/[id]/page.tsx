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
    userEmail: currentEmail!,
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
  const currentUserType: UserType =
    currentEmail && usersAccesses[currentEmail]?.[0] === "room:write"
      ? "editor"
      : "viewer";

  // ✅ Нормализуем метаданные документа
const roomMetadata: RoomMetadata = {
  creatorId: String(room.metadata?.creatorId ?? clerkUser.id),
  email: String(room.metadata?.email ?? currentEmail ?? ""),
  title: String(room.metadata?.title ?? "Untitled"),
};



  // ✅ Маппим пользователей в твой тип User
  const mappedUsers: User[] = (usersData ?? []).map((u: any) => ({
    id: u.id ?? "",
    name: u.name ?? "Unknown",
    email: u.email ?? "",
    avatar: u.avatar ?? "",
    color: u.color ?? "#ccc",
    userType: u.userType ?? "viewer",
  }));

  return (
    <main className="flex w-full flex-col items-center">
      <CollaborativeRoom
        roomId={id}
        roomMetadata={roomMetadata}
        users={mappedUsers}
        currentUserType={currentUserType}
      />
    </main>
  );
};

export default Document;
