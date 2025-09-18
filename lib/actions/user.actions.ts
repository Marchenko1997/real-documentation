"use server";

import { clerkClient } from "@clerk/clerk-sdk-node";

import { liveblocks } from "../liveblocks";
import { parseStringify } from "../utils";

// Объединяем Liveblocks + Clerk
export const getDocumentUsersWithDecorations = async ({
  roomId,
  currentUser,
  text,
}: {
  roomId: string;
  currentUser: string;
  text: string;
}) => {
  try {
    // 1. Берём комнату из Liveblocks
    const room = await liveblocks.getRoom(roomId);

    // 2. Список всех email (кроме текущего)
    let emails = Object.keys(room.usersAccesses).filter(
      (email) => email !== currentUser
    );

    // 3. Фильтр по поисковому тексту (если есть)
    if (text.length) {
      const lowerCaseText = text.toLowerCase();
      emails = emails.filter((email) =>
        email.toLowerCase().includes(lowerCaseText)
      );
    }

    console.log("Emails in room:", emails);

    // 4. Тянем Clerk-профили для этих email через clerkClient
    const users = await Promise.all(
      emails.map(async (email) => {
        try {
          const { data } = await clerkClient.users.getUserList({
            emailAddress: [email],
          });

          if (!data || data.length === 0) {
            console.warn(`No Clerk user found for ${email}`);
            return {
              email,
              role: room.usersAccesses[email],
              name: null,
              avatar: null,
            };
          }

          const u = data[0];
          return {
            email,
            role: room.usersAccesses[email],
            name: `${u.firstName ?? ""} ${u.lastName ?? ""}`.trim(),
            avatar: u.imageUrl,
          };
        } catch (err) {
          console.error(`Error fetching Clerk user for ${email}:`, err);
          return {
            email,
            role: room.usersAccesses[email],
            name: null,
            avatar: null,
          };
        }
      })
    );


    return parseStringify(users);
  } catch (error) {
    console.error("Error fetching document users with decorations:", error);
    return [];
  }
};
