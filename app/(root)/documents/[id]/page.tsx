import CollaborativeRoom from "@/components/CollaborativeRoom";
import { getDocument } from "@/lib/actions/room.actions";
import { getClerkUsers } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

const getPrimaryEmail = (user: any): string | undefined => {
  // Поддержка разных форматов от Clerk
  return (
    user?.email ||
    user?.emailAddress ||
    user?.primaryEmailAddress?.emailAddress ||
    user?.emailAddresses?.[0]?.emailAddress
  );
};

const Document = async ({ params: { id } }: SearchParamProps) => {
  const clerkUser = await currentUser();
  if (!clerkUser) redirect("/sign-in");

  const room = await getDocument({
    roomId: id,
    userId: clerkUser.emailAddresses[0].emailAddress,
  });
  if (!room) redirect("/");

  // Безопасно достаём usersAccesses и userIds
  const usersAccesses = room.usersAccesses ?? {};
  const userIds = Object.keys(usersAccesses);

  // Забираем пользователей и приводим к массиву
  const raw = userIds.length ? await getClerkUsers({ userIds }) : [];
  const usersArr: any[] = Array.isArray(raw) ? raw : raw?.users ?? raw?.data ?? [];

  // Строим usersData безопасно
  const usersData = usersArr.map((user) => {
    const email = getPrimaryEmail(user);
    const canWrite = email ? usersAccesses[email]?.includes("room:write") : false;
    return {
      ...user,
      userType: canWrite ? "editor" : "viewer",
    } as User & { userType: "editor" | "viewer" };
  });

  // Текущий пользователь: безопасно читаем тип доступа
  const currentEmail = clerkUser.emailAddresses?.[0]?.emailAddress;
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
