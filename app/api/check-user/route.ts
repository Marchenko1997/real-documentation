
import { NextResponse } from "next/server";
import { clerkClient } from "@clerk/clerk-sdk-node"; 

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json({ exists: false }, { status: 400 });
    }

   
    const { data } = await clerkClient.users.getUserList({
      emailAddress: [email],
      limit: 1,
    });

    const exists = data.length > 0;

    return NextResponse.json({ exists });
  } catch (error) {
    console.error("Error checking user:", error);
    return NextResponse.json({ exists: false }, { status: 500 });
  }
}
