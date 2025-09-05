
"use server";
import { nanoid } from "nanoid";
import { liveblocks } from "../liveblocks";
import { revalidatePath } from "next/cache";
import { parseStringify } from "../utils";
import { redirect } from "next/dist/server/api-utils";


export const createDocument = async ({
  userId,
  email,
}: CreateDocumentParams) => {
  const roomId = nanoid();

  try {
    const metadata = {
      creatorId: userId,
      email,
      title: "Untitled",
    };

    const usersAccesses: RoomAccesses = {
      [email]: ["room:write"],
    };

    const room = await liveblocks.createRoom(roomId, {
      metadata,
      usersAccesses,
      defaultAccesses: [],
    });

    revalidatePath("/");
    return parseStringify(room);
  } catch (error) {
    console.log(`Error creating document: ${error}`);
  }
};


export const getDocuments = async (userId: string) => {
  try {
    const rooms = await liveblocks.listRooms(); // список всех комнат
    // фильтруем по пользователю
    const userRooms = rooms.data.filter((room: any) =>
      Object.keys(room.usersAccesses).includes(userId)
    );

    return userRooms; // возвращаем массив
  } catch (error) {
    console.log(`Error fetching documents: ${error}`);
    return [];
  }
};


export const deleteDocument = async (roomId: string) => { 
  try {
    await liveblocks.deleteRoom(roomId);
    revalidatePath("/");
    redirect("/");
  } catch (error) {
    console.log(`Error deleting document: ${error}`);
  }
}